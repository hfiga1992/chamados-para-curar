import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/certificados`;

  downloadCertificado(usuarioId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${usuarioId}`, {
      responseType: 'blob'
    }).pipe(
      tap(blob => {
        // Cria um objeto URL para o blob
        const url = window.URL.createObjectURL(blob);

        // Cria um elemento <a> para download
        const a = document.createElement('a');
        a.href = url;
        a.download = `certificado-${usuarioId}.pdf`;

        // Adiciona ao DOM, clica e remove
        document.body.appendChild(a);
        a.click();

        // Limpeza
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
    );
  }
}
