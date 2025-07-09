import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Compra } from '../models/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private MOCK_COMPRAS: Compra[] = [
    { 
      id: 1, 
      dataCompra: new Date('2025-05-10'), 
      itens: [
        { id: 3, nome: 'Vela de Ignição - Iridium', marca: 'NGK', preco: 65.00 , estoque: 12, fotoUrl: '' },
        { id: 1, nome: 'Filtro de Óleo - Motor Zetec Rocam', marca: 'Bosch', preco: 85.50, estoque: 53, fotoUrl: '' }
      ],
      valorTotal: 150.50
    },
    { 
      id: 2, 
      dataCompra: new Date('2025-06-25'), 
      itens: [
        { id: 10, nome: 'Limpador de Parabrisa', marca: 'Dyna', preco: 120.00, estoque: 23, fotoUrl: '' }
      ],
      valorTotal: 120.00
    },
  ];

  constructor() { }

  getMinhasCompras(): Observable<Compra[]> {
    return of(this.MOCK_COMPRAS);
  }
}