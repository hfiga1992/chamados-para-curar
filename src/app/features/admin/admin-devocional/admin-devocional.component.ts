import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { DevocionalService } from '../../../core/services/devocional.service';
import { Devocional } from '../../../core/models/devocional.interface';

@Component({
  selector: 'app-admin-devocional',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    RouterLink
  ],
  template: `
    <div class="admin-container">
      <div class="max-w-4xl mx-auto p-4">
        <div class="mb-6 flex items-center justify-between">
          <h1 class="text-2xl font-semibold text-gray-800">Administração de Devocionais</h1>
          <div class="flex items-center space-x-4">
            <a routerLink="/admin/devocionais/novo" mat-raised-button color="primary" class="flex items-center">
              <mat-icon class="mr-1">add</mat-icon>
              Novo Devocional
            </a>
            <a routerLink="/perfil" class="text-blue-600 hover:text-blue-800 flex items-center">
              <mat-icon class="mr-1">arrow_back</mat-icon>
              Voltar ao Perfil
            </a>
          </div>
        </div>

        <mat-card class="shadow-lg rounded-lg overflow-hidden mb-8">
          <mat-card-header class="bg-gray-50 border-b border-gray-100 p-6">
            <mat-card-title>Cadastrar Novo Devocional</mat-card-title>
          </mat-card-header>

          <mat-card-content class="p-6">
            <form [formGroup]="devocionalForm" (ngSubmit)="onSubmit()">
              <mat-form-field class="w-full mb-4">
                <mat-label>Título</mat-label>
                <input matInput formControlName="titulo" placeholder="Digite o título do devocional">
                <mat-error *ngIf="devocionalForm.get('titulo')?.hasError('required')">
                  Título é obrigatório
                </mat-error>
              </mat-form-field>

              <mat-form-field class="w-full mb-4">
                <mat-label>Data</mat-label>
                <input matInput [matDatepicker]="picker" formControlName="data">
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                <mat-error *ngIf="devocionalForm.get('data')?.hasError('required')">
                  Data é obrigatória
                </mat-error>
              </mat-form-field>

              <mat-form-field class="w-full mb-4">
                <mat-label>Conteúdo</mat-label>
                <textarea matInput formControlName="conteudo" rows="8"
                  placeholder="Digite o conteúdo do devocional"></textarea>
                <mat-error *ngIf="devocionalForm.get('conteudo')?.hasError('required')">
                  Conteúdo é obrigatório
                </mat-error>
              </mat-form-field>

              <div class="flex justify-end">
                <button
                  mat-raised-button
                  color="primary"
                  type="submit"
                  [disabled]="devocionalForm.invalid || isSubmitting">
                  <span *ngIf="!isSubmitting">Salvar Devocional</span>
                  <mat-spinner *ngIf="isSubmitting" [diameter]="24"></mat-spinner>
                </button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>

        <!-- Lista de Devocionais Cadastrados -->
        <mat-card class="shadow-lg rounded-lg overflow-hidden">
          <mat-card-header class="bg-gray-50 border-b border-gray-100 p-6">
            <mat-card-title>Devocionais Cadastrados</mat-card-title>
          </mat-card-header>

          <mat-card-content class="p-6">
            <div *ngIf="isLoadingDevocionais" class="flex justify-center py-8">
              <mat-spinner [diameter]="40"></mat-spinner>
            </div>

            <div *ngIf="!isLoadingDevocionais && devocionais.length === 0" class="text-center py-8">
              <p>Nenhum devocional cadastrado.</p>
            </div>

            <div *ngIf="!isLoadingDevocionais && devocionais.length > 0" class="overflow-x-auto">
              <table class="min-w-full bg-white">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="py-2 px-4 text-left">Data</th>
                    <th class="py-2 px-4 text-left">Título</th>
                    <th class="py-2 px-4 text-left">Conteúdo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let devocional of devocionais" class="border-b hover:bg-gray-50">
                    <td class="py-2 px-4">{{ formatarData(devocional.data) }}</td>
                    <td class="py-2 px-4">{{ devocional.titulo }}</td>
                    <td class="py-2 px-4 truncate max-w-xs">{{ devocional.conteudo }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      min-height: calc(100vh - 64px);
      background-color: #f9fafb;
      padding: 2rem 1rem;
    }

    mat-form-field {
      width: 100%;
    }

    textarea {
      min-height: 150px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    .truncate {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `]
})
export class AdminDevocionalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private devocionalService = inject(DevocionalService);
  private snackBar = inject(MatSnackBar);

  devocionalForm: FormGroup;
  isSubmitting = false;
  devocionais: Devocional[] = [];
  isLoadingDevocionais = false;

  constructor() {
    this.devocionalForm = this.fb.group({
      titulo: ['', Validators.required],
      conteudo: ['', Validators.required],
      data: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarDevocionais();
  }

  onSubmit(): void {
    if (this.devocionalForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const formData = this.devocionalForm.value;

    // Garantir que a data esteja no formato correto
    if (formData.data instanceof Date) {
      formData.data = formData.data.toISOString().split('T')[0];
    }

    this.devocionalService.criarDevocional(formData)
      .subscribe({
        next: () => {
          this.snackBar.open('Devocional cadastrado com sucesso!', 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.devocionalForm.reset();
          this.devocionalForm.patchValue({ data: new Date() });
          this.isSubmitting = false;
          this.carregarDevocionais(); // Recarregar lista após cadastrar
        },
        error: (error) => {
          console.error('Erro ao cadastrar devocional:', error);
          this.snackBar.open(
            error.error || 'Erro ao cadastrar devocional. Tente novamente.',
            'Fechar',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            }
          );
          this.isSubmitting = false;
        }
      });
  }

  carregarDevocionais(): void {
    this.isLoadingDevocionais = true;
    this.devocionalService.listarDevocionais()
      .subscribe({
        next: (devocionais: Devocional[]) => {
          this.devocionais = devocionais;
          this.isLoadingDevocionais = false;
        },
        error: (error: unknown) => {
          console.error('Erro ao carregar devocionais:', error);
          this.isLoadingDevocionais = false;
        }
      });
  }

  formatarData(data: string): string {
    const dataObj = new Date(data);
    return dataObj.toLocaleDateString('pt-BR');
  }
}
