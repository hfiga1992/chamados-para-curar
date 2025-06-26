import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap, map, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

import { Devocional } from '../models/devocional.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevocionalService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/devocionais`;
  private isBrowser: boolean;

  // Chaves para armazenar no localStorage
  private readonly DEVOCIONAL_LIDO_KEY = 'devocional_lido_hoje';
  private readonly ULTIMA_VERIFICACAO_KEY = 'ultima_verificacao_devocional';

  // Estado local para devocional lido hoje
  private _devocionalLidoHoje = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this._devocionalLidoHoje = this.getEstadoLidoFromStorage();

      // Verificar se precisamos buscar o estado mais atualizado da API
      this.verificarNecessidadeAtualizacao();
    }
  }

  get devocionalLidoHoje(): boolean {
    // Sempre verificar o localStorage ao acessar o getter para garantir o estado atualizado
    if (this.isBrowser) {
      this._devocionalLidoHoje = this.getEstadoLidoFromStorage();
    }
    return this._devocionalLidoHoje;
  }

  /**
   * Verifica se o devocional de hoje já foi lido, consultando a API se necessário
   */
  verificarDevocionalLidoHoje(): Observable<boolean> {
    // Se não estamos no navegador, retorna false
    if (!this.isBrowser) {
      return of(false);
    }

    // Se já temos o estado no localStorage e ele foi verificado hoje, retorna esse estado
    if (this.verificadoHoje()) {
      return of(this._devocionalLidoHoje);
    }

    // Caso contrário, consulta a API para obter o estado mais atualizado
    return this.getDevocionalDoDia().pipe(
      map(() => this._devocionalLidoHoje) // O estado é atualizado durante o getDevocionalDoDia
    );
  }

  private verificarNecessidadeAtualizacao(): void {
    if (!this.verificadoHoje()) {
      // Se não verificamos hoje, buscar da API silenciosamente
      this.getDevocionalDoDia().subscribe({
        error: (err) => console.error('Erro ao verificar estado do devocional:', err)
      });
    }
  }

  /**
   * Verifica se o estado do devocional foi atualizado hoje
   */
  private verificadoHoje(): boolean {
    const ultimaVerificacao = localStorage.getItem(this.ULTIMA_VERIFICACAO_KEY);
    if (!ultimaVerificacao) {
      return false;
    }

    const dataUltimaVerificacao = new Date(ultimaVerificacao);
    const hoje = new Date();

    return dataUltimaVerificacao.getDate() === hoje.getDate() &&
      dataUltimaVerificacao.getMonth() === hoje.getMonth() &&
      dataUltimaVerificacao.getFullYear() === hoje.getFullYear();
  }

  /**
   * Salva a data atual como a última verificação
   */
  private salvarDataVerificacao(): void {
    if (this.isBrowser) {
      localStorage.setItem(this.ULTIMA_VERIFICACAO_KEY, new Date().toISOString());
    }
  }

  getDevocionalDoDia(): Observable<Devocional> {
    return this.http.get<Devocional>(`${this.apiUrl}/hoje`, { observe: 'response' })
      .pipe(
        tap(response => {
          // Verificar o cabeçalho X-Devocional-Lido
          const lidoHeader = response.headers.get('X-Devocional-Lido');
          const jaLido = lidoHeader === 'true';

          // Atualizar o estado local e persistir
          this._devocionalLidoHoje = jaLido;
          this.salvarEstadoLido(jaLido);
          this.salvarDataVerificacao();
        }),
        map(response => response.body as Devocional)
      );
  }

  getDevocionalPorData(data: string): Observable<Devocional> {
    return this.http.get<Devocional>(`${this.apiUrl}/data/${data}`);
  }

  criarDevocional(devocional: Devocional): Observable<Devocional> {
    return this.http.post<Devocional>(this.apiUrl, devocional);
  }

  listarDevocionais(): Observable<Devocional[]> {
    return this.http.get<Devocional[]>(`${this.apiUrl}`);
  }

  marcarComoLido(): Observable<{sucesso: boolean, mensagem: string}> {
    return this.http.post<{sucesso: boolean, mensagem: string}>(`${this.apiUrl}/ler`, {})
      .pipe(
        tap(() => {
          // Atualizar estado local e persistir
          this._devocionalLidoHoje = true;
          this.salvarEstadoLido(true);
          this.salvarDataVerificacao();
        })
      );
  }

  private getEstadoLidoFromStorage(): boolean {
    if (!this.isBrowser) return false;

    const estadoSalvo = localStorage.getItem(this.DEVOCIONAL_LIDO_KEY);
    if (estadoSalvo !== null) {
      try {
        const { lido, data } = JSON.parse(estadoSalvo);

        // Verifica se é do mesmo dia
        const dataSalva = new Date(data);
        const hoje = new Date();

        const mesmoDia = dataSalva.getDate() === hoje.getDate() &&
                        dataSalva.getMonth() === hoje.getMonth() &&
                        dataSalva.getFullYear() === hoje.getFullYear();

        // Só retorna true se for o mesmo dia
        return mesmoDia && lido === true;
      } catch (e) {
        console.error('Erro ao ler estado do devocional do localStorage:', e);
        return false;
      }
    }

    return false;
  }

  private salvarEstadoLido(lido: boolean): void {
    if (!this.isBrowser) return;

    const estadoDevocional = {
      lido,
      data: new Date().toISOString()
    };

    localStorage.setItem(this.DEVOCIONAL_LIDO_KEY, JSON.stringify(estadoDevocional));
  }
}
