import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EnderecoService {
  private apiUrl = 'http://localhost:8080/api/enderecos';

  constructor(private http: HttpClient) {}

  /**
   * Cria um endereço mínimo no backend e retorna o idEndereco (ou null em caso de falha).
   * Payload esperado pelo backend (body):
   * {
   *   logradouroCEP: string, // CEP somente dígitos
   *   numeroEndereco: string,
   *   complementoEndereco?: string,
   *   referencia?: string | null,
   *   idBairro?: number | null,
   *   idCidade?: number | null
   * }
   *
   * Query params recomendados pelo backend para auto-seed do CEP (opcionais):
   *   uf, nomeUF, cidade, bairro, logradouro, siglaLog
   */
  createEndereco(payload: any, meta?: {
    uf?: string;
    nomeUF?: string;
    cidade?: string;
    bairro?: string;
    logradouro?: string;
    siglaLog?: string;
  }): Observable<number | null> {
    let params = new HttpParams();
    if (meta) {
      const add = (k: string, v?: string) => {
        if (v && v.toString().trim().length > 0) params = params.set(k, v.toString().trim());
      };
      add('uf', meta.uf);
      add('nomeUF', meta.nomeUF);
      add('cidade', meta.cidade);
      add('bairro', meta.bairro);
      add('logradouro', meta.logradouro);
      add('siglaLog', meta.siglaLog);
    }
    return this.http.post<any>(this.apiUrl, payload, { observe: 'response', params }).pipe(
      map(res => {
        const body = res.body;
        if (!body) return null;
        if (typeof body === 'object') {
          // Tenta idEndereco em várias chaves usuais
          return body.idEndereco ?? body.id ?? null;
        }
        // Caso backend retorne apenas o ID em texto
        const num = Number(body);
        return Number.isFinite(num) ? num : null;
      }),
      catchError(() => of(null))
    );
  }
}
