import { Component, OnInit, inject } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { DevocionalService } from '../../../core/services/devocional.service';
import { Devocional } from '../../../core/models/devocional.interface';

@Component({
  selector: 'app-admin-devocionais-page',
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
    MatIconModule,
    RouterLink
  ],
  templateUrl: './admin-devocionais-page.component.html',
  styleUrls: ['./admin-devocionais-page.component.scss']
})
export class AdminDevocionaisPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private devocionalService = inject(DevocionalService);
  private snackBar = inject(MatSnackBar);

  devocionalForm: FormGroup;
  isSubmitting = false;

  constructor() {
    this.devocionalForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      conteudo: ['', [Validators.required, Validators.minLength(10)]],
      data: [new Date(), Validators.required],
      versiculoChave: [''],
      autor: ['']
    });
  }

  ngOnInit(): void {
    // Inicialização do componente
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
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
          this.resetForm();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Erro ao cadastrar devocional:', error);
          this.snackBar.open(
            error.error || 'Erro ao cadastrar devocional. Tente novamente.',
            'Fechar',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['error-snackbar']
            }
          );
          this.isSubmitting = false;
        }
      });
  }

  resetForm(): void {
    this.devocionalForm.reset();
    this.devocionalForm.patchValue({
      data: new Date(),
      titulo: '',
      conteudo: '',
      versiculoChave: '',
      autor: ''
    });
  }
}
