import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Chamados para Curar'
  },
  {
    path: 'sobre',
    loadComponent: () => import('./features/sobre/sobre.component').then(m => m.SobreComponent),
    title: 'Sobre - Chamados para Curar'
  },
  {
    path: 'seminario',
    loadComponent: () => import('./features/seminario/seminario.component').then(m => m.SeminarioComponent),
    title: 'Seminário - Chamados para Curar'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    title: 'Login - Chamados para Curar'
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./features/cadastro/cadastro.component').then(m => m.CadastroComponent),
    title: 'Criar conta - Chamados para Curar'
  },
  {
    path: 'perfil',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Chamados para Curar'
  },
  {
    path: 'devocionais',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Chamados para Curar'
  },
  {
    path: 'admin/devocionais',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Chamados para Curar'
  },
  {
    path: 'admin/devocionais/novo',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Chamados para Curar'
  },
  { path: '**', redirectTo: '/' }
];
