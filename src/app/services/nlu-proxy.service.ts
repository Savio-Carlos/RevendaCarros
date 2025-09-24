import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NLU_PROXY_URL } from './ai-provider.config';

export interface NluProxyResponse {
  intent: string;
  entities: Record<string, any>;
}

@Injectable({ providedIn: 'root' })
export class NluProxyService {
  constructor(private http: HttpClient) {}
  interpret(texto: string): Observable<NluProxyResponse> {
    return this.http.post<NluProxyResponse>(NLU_PROXY_URL, { texto });
  }
}
