import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Venda } from '../models/venda';

// Formato retornado por GET /api/vendas (resumo enriquecido)
interface VendaResumoBackend {
  idVenda: number;
  dataVenda: string; // yyyy-MM-dd
  precoVendaVeiculo: number;
  formaPagamento?: string;
  idCliente: number;
  clienteNome: string;
  idFuncionario: number;
  funcionarioNome: string;
  numChassiVeiculo: string;
  veiculoModelo: string;
  placa: string;
  marcaCarro: string;
}

// Payload esperado por POST /api/vendas
export interface CriarVendaPayload {
  idCliente: number;
  idFuncionario: number;
  numChassiVeiculo: string;
  precoVendaVeiculo: number;
  formaPagamento?: string;
}

// Resposta de POST /api/vendas (objeto Venda simples do backend)
export interface VendaBackend {
  idVenda: number;
  dataVenda: string; // yyyy-MM-dd
  precoVendaVeiculo: number;
  formaPagamento?: string;
  idCliente: number;
  idFuncionario: number;
  numChassiVeiculo: string;
}

@Injectable({ providedIn: 'root' })
export class VendaService {
  private apiUrl = 'http://localhost:8080/api/vendas';

  constructor(private http: HttpClient) {}

  // Lista vendas (resumo) e adapta para o modelo de UI existente
  getVendas(): Observable<Venda[]> {
    return this.http.get<VendaResumoBackend[]>(this.apiUrl).pipe(
      map(list => list.map(v => ({
        id: v.idVenda,
        dataVenda: new Date(v.dataVenda),
        tipo: 'Carro' as const,
        itemVendido: {
          numChassi: v.numChassiVeiculo,
          modeloVeiculo: v.veiculoModelo,
          marcaCarro: v.marcaCarro,
          placa: v.placa
        } as any,
        valorFinal: v.precoVendaVeiculo,
        vendedor: v.funcionarioNome
      })))
    );
  }

  // Cria uma venda
  criarVenda(payload: CriarVendaPayload): Observable<VendaBackend> {
    return this.http.post<VendaBackend>(this.apiUrl, payload);
  }

  // Consulta venda por ID (usa formato retornado pelo backend, sem map)
  getVendaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}