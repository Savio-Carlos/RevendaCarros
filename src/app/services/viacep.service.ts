import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ViaCepService {
  constructor(private http: HttpClient) {}

  lookup(cepDigits: string): Observable<Partial<ViaCepResponse> | null> {
    const clean = (cepDigits || '').replace(/\D/g, '');
    if (clean.length !== 8) return of(null);
    const url = `https://viacep.com.br/ws/${clean}/json/`;
    return this.http.get<ViaCepResponse>(url).pipe(
      map(r => (r && !r.erro) ? r : null),
      catchError(() => of(null))
    );
  }
}
