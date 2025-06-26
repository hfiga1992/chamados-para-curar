import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  returnUrl = '/';
  hidePassword = true;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Obter URL de retorno dos parâmetros de consulta ou usar o padrão
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
    });

    // Se já estiver logado, redireciona para a página inicial
    if (this.authService.checkIfAuthenticated()) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.errorMessage = 'Credenciais inválidas.';
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.errorMessage = 'Erro ao fazer login. Tente novamente.';
        console.error('Erro de login:', error);
        this.isLoading = false;
      }
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  esqueceuSenha(): void {
    const email = this.loginForm.get('email')?.value;

    if (email && this.loginForm.get('email')?.valid) {
      this.snackBar.open(
        'Um email de recuperação será enviado para este endereço se ele estiver cadastrado.',
        'Fechar',
        { duration: 5000 }
      );

      // Aqui você implementaria a chamada para o serviço de recuperação de senha
      // this.authService.solicitarRecuperacaoSenha(email).subscribe(...)
    } else {
      this.snackBar.open(
        'Por favor, informe um email válido para recuperar sua senha.',
        'Fechar',
        { duration: 5000 }
      );

      // Focar no campo de email
      document.getElementById('email-input')?.focus();
    }
  }

  criarConta(): void {
    // Navegar para a página de cadastro
    this.router.navigate(['/cadastro']);
  }
}
