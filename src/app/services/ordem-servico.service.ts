import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Revisao } from '../models/revisao';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {
  
  // ✅ Dados de exemplo mais completos
  private MOCK_ORDENS_SERVICO: Revisao[] = [
    { id: 101, data: new Date('2025-07-10'), quilometragem: 28300, servicosRealizados: [{id: 1, nome: 'Troca de óleo', preco: 250} as any], pecasTrocadas: [], mecanicoResponsavel: 'Mecânico Logado', custoTotal: 250, status: 'Em Aberto', clienteNome: 'Carlos Eduardo', veiculoDescricao: 'Compass Longitude (Jeep)' },
    { id: 102, data: new Date('2025-07-09'), quilometragem: 10500, servicosRealizados: [{id: 2, nome: 'Alinhamento', preco: 150} as any], pecasTrocadas: [], mecanicoResponsavel: 'Mecânico Logado', custoTotal: 150, status: 'Em Aberto', clienteNome: 'Ana Paula', veiculoDescricao: 'Onix Plus Turbo (Chevrolet)' },
    { id: 103, data: new Date('2025-06-20'), quilometragem: 55000, servicosRealizados: [{id: 5, nome: 'Revisão de Freios', preco: 180} as any], pecasTrocadas: [], mecanicoResponsavel: 'Mecânico Logado', custoTotal: 180, status: 'Concluído', clienteNome: 'Carlos Eduardo', veiculoDescricao: 'Compass Longitude (Jeep)' },
  ];

  private ordensSubject = new BehaviorSubject<Revisao[]>(this.MOCK_ORDENS_SERVICO);

  constructor() { }

  getOrdens(): Observable<Revisao[]> {
    return this.ordensSubject.asObservable();
  }

  criarOrdem(novaOrdem: Revisao): Observable<Revisao> {
    novaOrdem.id = Math.floor(Math.random() * 1000);
    novaOrdem.status = 'Em Aberto';
    this.MOCK_ORDENS_SERVICO.unshift(novaOrdem);
    this.ordensSubject.next(this.MOCK_ORDENS_SERVICO);
    return of(novaOrdem);
  }

  finalizarOrdem(ordemId: number): Observable<any> {
    const ordem = this.MOCK_ORDENS_SERVICO.find(o => o.id === ordemId);
    if (ordem) {
      ordem.status = 'Concluído';
      this.ordensSubject.next(this.MOCK_ORDENS_SERVICO);
    }
    return of({ success: true });
  }
}