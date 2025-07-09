import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Venda } from '../models/venda';

const MOCK_VENDAS: Venda[] = [
  { id: 1, dataVenda: new Date('2025-06-15'), tipo: 'Carro', itemVendido: { id: 1, modelo: 'HB20 Sense', marca: 'Hyundai' } as any, valorFinal: 75000, vendedor: 'Vendedor' },
  { id: 2, dataVenda: new Date('2025-06-22'), tipo: 'Peça', itemVendido: { id: 101, nome: 'Filtro de Óleo' } as any, valorFinal: 85, vendedor: 'Vendedor' },
  { id: 3, dataVenda: new Date('2025-07-01'), tipo: 'Carro', itemVendido: { id: 2, modelo: 'Onix Plus Turbo', marca: 'Chevrolet' } as any, valorFinal: 96000, vendedor: 'Vendedor' },
  { id: 4, dataVenda: new Date('2025-07-05'), tipo: 'Peça', itemVendido: { id: 102, nome: 'Pastilha de Freio' } as any, valorFinal: 250, vendedor: 'Vendedor' },
  { id: 5, dataVenda: new Date('2025-07-08'), tipo: 'Carro', itemVendido: { id: 4, modelo: 'Mobi Like', marca: 'Fiat' } as any, valorFinal: 72000, vendedor: 'Vendedor' },
];

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor() { }

  getVendas(): Observable<Venda[]> {
    return of(MOCK_VENDAS);
  }
}