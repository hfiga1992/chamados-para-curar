export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  usuario: {
    id: string;
    nome?: string;
    email: string;
    tipo: 'Gratuito' | 'Pago';
  };
}
