import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { CertificadoService } from '../../core/services/certificado.service';
import { Usuario } from '../../core/models/usuario.interface';
import { UsuarioService } from '../../core/services/usuario.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    RouterLink,
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  private authService = inject(AuthService);
  private certificadoService = inject(CertificadoService);
  private usuarioService = inject(UsuarioService);

  usuario: Usuario | null = null;
  isLoading = false;
  error: string | null = null;
  downloadingCertificado = false;

  ngOnInit(): void {
    this.carregarDadosUsuario();
  }

  carregarDadosUsuario(): void {
    this.isLoading = true;
    this.error = null;

    // Verificar se o usuário já está disponível no AuthService
    this.usuario = this.authService.usuarioAtual();

    if (this.usuario) {
      // Se já temos o ID do usuário, buscar dados completos da API
      this.usuarioService.getMeuPerfil().subscribe({
        next: (dadosCompletos) => {
          this.usuario = dadosCompletos;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar dados completos:', err);
          this.error = 'Erro ao carregar dados completos do usuário.';
          this.isLoading = false;
        }
      });
    } else {
      // Se não estiver disponível, tentar carregar do token
      const userInfo = this.authService.getUserInfoFromToken();
      if (userInfo) {
        this.usuario = userInfo;
        // Buscar dados completos da API
        this.usuarioService.getMeuPerfil().subscribe({
          next: (dadosCompletos) => {
            this.usuario = dadosCompletos;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Erro ao carregar dados completos:', err);
            this.error = 'Erro ao carregar dados completos do usuário.';
            this.isLoading = false;
          }
        });
      } else {
        this.error = 'Não foi possível carregar os dados do usuário.';
        console.error('Falha ao carregar dados do usuário. Verifique se o token JWT está presente e válido.');
        this.isLoading = false;
      }
    }
  }

  onDownloadCertificado(): void {
    if (!this.usuario) {
      this.error = 'Usuário não encontrado.';
      return;
    }

    this.downloadingCertificado = true;
    this.error = null;

    this.certificadoService.downloadCertificado(this.usuario.id)
      .subscribe({
        next: () => {
          this.downloadingCertificado = false;
        },
        error: () => {
          this.error = 'Erro ao baixar o certificado.';
          this.downloadingCertificado = false;
        }
      });
  }

  logout(): void {
    this.authService.logout();
  }
}
