import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Peca } from '../models/peca';

@Injectable({
  providedIn: 'root'
})
export class PecaService {
 private MOCK_PECAS: Peca[] = [
    { id: 1, nome: 'Filtro de Óleo - Motor Zetec Rocam', marca: 'Bosch', estoque: 12, preco: 85.50, fotoUrl: 'assets/images/filtrooleo.webp' },
    { id: 2, nome: 'Pastilha de Freio Dianteira - Onix/Prisma', marca: 'ACDelco', estoque: 42, preco: 250.00, fotoUrl: 'assets/images/pastilhasac.webp' },
    { id: 3, nome: 'Vela de Ignição Iridium - Civic/Corolla', marca: 'NGK', estoque: 25, preco: 65.00, fotoUrl: 'assets/images/vela.webp' },
    { id: 4, nome: 'Amortecedor Traseiro - Gol G5/G6', marca: 'Cofap', estoque: 3, preco: 450.00, fotoUrl: 'assets/images/amortecedor.webp' },
  ];

  constructor() { }

  getAll(): Observable<Peca[]> {
    return of(this.MOCK_PECAS);
  }

  getById(id: number): Observable<Peca | undefined> {
    return of(this.MOCK_PECAS.find(p => p.id === id));
  }

  add(peca: Peca): Observable<Peca> {
    const newId = Math.max(...this.MOCK_PECAS.map(p => p.id), 0) + 1;
    peca.id = newId;
    this.MOCK_PECAS.push(peca);
    return of(peca);
  }

  update(pecaToUpdate: Peca): Observable<Peca> {
    const index = this.MOCK_PECAS.findIndex(p => p.id === pecaToUpdate.id);
    if (index !== -1) {
      this.MOCK_PECAS[index] = pecaToUpdate;
    }
    return of(pecaToUpdate);
  }

  delete(id: number): Observable<any> {
    const index = this.MOCK_PECAS.findIndex(p => p.id === id);
    if (index !== -1) {
      this.MOCK_PECAS.splice(index, 1);
    }
    return of(null);
  }
}