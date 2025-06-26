import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../core/services/auth.service';
import { UsuarioService } from '../../core/services/usuario.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  cadastroForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  hidePassword = true;
  hidePasswordConfirm = true;

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmaSenha: ['', [Validators.required]]
    }, { validators: this.senhasIguaisValidator });

    // Se já estiver logado, redireciona para o perfil
    if (this.authService.checkIfAuthenticated()) {
      this.router.navigateByUrl('/perfil');
    }
  }

  senhasIguaisValidator(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('senha')?.value;
    const confirmaSenha = control.get('confirmaSenha')?.value;

    return senha === confirmaSenha ? null : { senhasDiferentes: true };
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { nome, email, senha } = this.cadastroForm.value;

    this.usuarioService.criarUsuario({ nome, email, senha }).subscribe({
      next: () => {
        this.snackBar.open('Conta criada com sucesso! Faça o login para continuar.', 'Fechar', { duration: 5000 });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        if (error.status === 400 && error.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Erro ao criar conta. Tente novamente mais tarde.';
        }
        console.error('Erro de cadastro:', error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else {
      this.hidePasswordConfirm = !this.hidePasswordConfirm;
    }
  }

  irParaLogin(): void {
    this.router.navigate(['/login']);
  }
}
