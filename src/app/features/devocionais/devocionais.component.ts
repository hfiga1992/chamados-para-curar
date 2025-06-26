import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

import { DevocionalService } from '../../core/services/devocional.service';
import { Devocional } from '../../core/models/devocional.interface';

@Component({
  selector: 'app-devocionais',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    RouterLink
  ],
  templateUrl: './devocionais.component.html',
  styleUrls: ['./devocionais.component.scss']
})
export class DevocionaisComponent implements OnInit {
  private devocionalService = inject(DevocionalService);
  private snackBar = inject(MatSnackBar);

  devocional: Devocional | null = null;
  isLoading = false;
  isMarcandoLido = false;
  error: string | null = null;

  // Propriedade para armazenar o estado de leitura
  private _devocionalLido = false;

  get devocionalLido(): boolean {
    // Usar o getter do serviço para garantir o estado atualizado
    return this.devocionalService.devocionalLidoHoje;
  }

  ngOnInit(): void {
    this.carregarDevocionalDoDia();
  }

  carregarDevocionalDoDia(): void {
    this.isLoading = true;
    this.error = null;

    this.devocionalService.getDevocionalDoDia().subscribe({
      next: (devocional) => {
        this.devocional = devocional;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar devocional:', err);
        this.error = 'Não foi possível carregar o devocional do dia. Tente novamente mais tarde.';
        this.isLoading = false;
      }
    });
  }

  marcarComoLido(): void {
    if (this.devocionalLido || !this.devocional) {
      return;
    }

    this.isMarcandoLido = true;

    this.devocionalService.marcarComoLido().subscribe({
      next: (resposta) => {
        this.snackBar.open('Devocional lido hoje!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
        this.isMarcandoLido = false;
      },
      error: (erro) => {
        console.error('Erro ao marcar devocional como lido:', erro);
        this.snackBar.open('Erro ao marcar como lido. Tente novamente.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
        this.isMarcandoLido = false;
      }
    });
  }

  formatarData(data: string): string {
    const dataObj = new Date(data);

    // Formatar para "21 de junho de 2025"
    const opcoes: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    return dataObj.toLocaleDateString('pt-BR', opcoes);
  }
}
