import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import { DevocionalService } from '../../../core/services/devocional.service';

@Component({
  selector: 'app-devocional-alert',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './devocional-alert.component.html',
  styleUrls: ['./devocional-alert.component.scss']
})
export class DevocionalAlertComponent implements OnInit {
  private devocionalService = inject(DevocionalService);
  private router = inject(Router);

  // Controla a visibilidade do alerta
  mostrarAlerta = false;

  // Chave para salvar no localStorage quando o alerta foi visto pela última vez
  private readonly ULTIMO_ALERTA_KEY = 'ultimo_alerta_devocional';

  ngOnInit(): void {
    this.verificarDevocionalDoDia();
  }

  verificarDevocionalDoDia(): void {
    // Verifica se já mostrou o alerta hoje
    if (this.mostrarAlertaHoje()) {
      // Verifica se o devocional já foi lido via API/localStorage
      this.devocionalService.verificarDevocionalLidoHoje().subscribe(lido => {
        this.mostrarAlerta = !lido;
      });
    }
  }

  /**
   * Verifica se o alerta já foi mostrado hoje
   * @returns true se não foi mostrado hoje ou false caso contrário
   */
  private mostrarAlertaHoje(): boolean {
    const ultimoAlerta = localStorage.getItem(this.ULTIMO_ALERTA_KEY);
    if (!ultimoAlerta) {
      return true;
    }

    // Verifica se é o mesmo dia
    const dataUltimoAlerta = new Date(ultimoAlerta);
    const hoje = new Date();

    return dataUltimoAlerta.getDate() !== hoje.getDate() ||
      dataUltimoAlerta.getMonth() !== hoje.getMonth() ||
      dataUltimoAlerta.getFullYear() !== hoje.getFullYear();
  }

  /**
   * Salva a data atual como a última vez que o alerta foi visto
   */
  salvarDataVisualizacao(): void {
    localStorage.setItem(this.ULTIMO_ALERTA_KEY, new Date().toISOString());
  }

  /**
   * Fecha o alerta sem navegar para o devocional
   */
  fecharAlerta(): void {
    this.mostrarAlerta = false;
    this.salvarDataVisualizacao();
  }

  /**
   * Navega para a página de devocional
   */
  irParaDevocional(): void {
    this.fecharAlerta();
    this.router.navigate(['/devocionais']);
  }
}
