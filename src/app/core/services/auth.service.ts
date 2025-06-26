import { Injectable, inject, signal, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap, switchMap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

import { LoginRequest, LoginResponse } from '../models/auth.interface';
import { Usuario } from '../models/usuario.interface';
import { environment } from '../../../environments/environment';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);
  private isBrowser: boolean;

  private AUTH_KEY = 'auth_token';
  private apiUrl = `${environment.apiUrl}/auth`;

  // Sinal para o estado de autenticação
  private isAuthenticatedSignal = signal<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSignal.asReadonly();

  // Sinal para o usuário atual
  private usuarioAtualSignal = signal<Usuario | null>(null);
  public usuarioAtual = this.usuarioAtualSignal.asReadonly();

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Não verifica autenticação automaticamente para evitar looping/travamento
    // Se estiver no navegador, vamos apenas definir o estado baseado no token
    if (this.isBrowser) {
      this.isAuthenticatedSignal.set(!!this.getToken());
    }

    // Comentando a parte que pode estar causando problemas
    // A verificação completa será feita após a renderização da página
    /*
    if (this.isBrowser) {
      this.isAuthenticatedSignal.set(this.checkIfAuthenticated());

      // Carregar dados do usuário se já estiver autenticado
      if (this.isAuthenticatedSignal()) {
        this.carregarUsuario();
      }
    }
    */
  }

  login(credentials: LoginRequest): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (this.isBrowser) {
            localStorage.setItem(this.AUTH_KEY, response.token);
          }
          this.isAuthenticatedSignal.set(true);

          // Definir dados básicos do usuário a partir da resposta
          if (response.usuario) {
            this.usuarioAtualSignal.set(response.usuario);
          }
        }),
        // Buscar dados completos do usuário após login bem-sucedido
        switchMap(() => this.carregarDadosCompletos()),
        map(() => true),
        catchError(error => {
          console.error('Erro no login:', error);
          return of(false);
        })
      );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.AUTH_KEY);
    }
    this.isAuthenticatedSignal.set(false);
    this.usuarioAtualSignal.set(null);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.AUTH_KEY);
    }
    return null;
  }

  checkIfAuthenticated(): boolean {
    const token = this.getToken();
    // Uma verificação simples por enquanto - poderia adicionar verificação de validade baseada no JWT
    return !!token;
  }

  getUserInfoFromToken(): Usuario | null {
    try {
      const token = this.getToken();
      if (!token) {
        return null;
      }

      // Decodificar o token JWT (formato: header.payload.signature)
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        return null;
      }

      // Decodificar o payload do token (parte do meio)
      const payload = JSON.parse(atob(tokenParts[1]));

      // Verificar se o token expirou
      const expirationDate = new Date(payload.exp * 1000);
      if (new Date() > expirationDate) {
        this.logout();
        return null;
      }

      // Extrair claims específicas do JWT
      return {
        id: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        nome: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        tipo: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      } as Usuario;
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }

  isLoggedIn(): Observable<boolean> {
    return of(this.isAuthenticatedSignal());
  }

  private carregarUsuario(): void {
    const userInfo = this.getUserInfoFromToken();
    if (userInfo) {
      this.usuarioAtualSignal.set(userInfo);

      // Após definir as informações básicas do token, buscar dados completos
      this.carregarDadosCompletos().subscribe();
    }
  }

  private carregarDadosCompletos(): Observable<Usuario | null> {
    return this.usuarioService.getMeuPerfil().pipe(
      tap(usuario => {
        console.log('Dados completos do usuário carregados:', usuario);
        this.usuarioAtualSignal.set(usuario);
      }),
      catchError(error => {
        console.error('Erro ao carregar dados completos do usuário:', error);
        return of(null);
      })
    );
  }
}
