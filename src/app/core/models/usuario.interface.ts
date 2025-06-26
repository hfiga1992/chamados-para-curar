export interface Usuario {
  id: string;
  email: string;
  tipo: 'Gratuito' | 'Pago' | 'Admin';
  nome?: string;
}
