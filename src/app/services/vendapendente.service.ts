import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VendaPendente } from '../models/vendapendente';
import { GerenteService } from './gerente.service';
import { CarroService } from './carro.service';

@Injectable({
  providedIn: 'root'
})
export class VendaPendenteService {

  private MOCK_VENDAS_PENDENTES: VendaPendente[] = [];

  constructor(
    private gerenteService: GerenteService,
    private carroService: CarroService
  ) {
    let mockClientes: any[] = [];
    let mockCarros: any[] = [];

    this.gerenteService.getClientesCompletos().subscribe(c => mockClientes = c);
    this.carroService.getCarros().subscribe(c => mockCarros = c);

    this.MOCK_VENDAS_PENDENTES = [
      { id: 1, cliente: mockClientes[0], carro: mockCarros[0], dataInicio: new Date('2025-07-08'), status: 'Aguardando Pagamento' },
      { id: 2, cliente: mockClientes[1], carro: mockCarros[3], dataInicio: new Date('2025-07-05'), status: 'Concluido' },
    ];
  }

  getVendasPendentes(): Observable<VendaPendente[]> {
    return of(this.MOCK_VENDAS_PENDENTES);
  }
}