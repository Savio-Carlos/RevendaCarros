import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AZURE_PROXY_URL } from './ai-provider.config';

export interface AzureProxyResponse {
  intent: string;
  entities: Record<string, any>;
}

@Injectable({ providedIn: 'root' })
export class AzureProxyService {
  constructor(private http: HttpClient) {}
  interpret(texto: string): Observable<AzureProxyResponse> {
    return this.http.post<AzureProxyResponse>(AZURE_PROXY_URL, { texto });
  }
}
