import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Itemcarrinho } from '../models/itemcarrinho';
import { Peca } from '../models/peca';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itemsSubject = new BehaviorSubject<Itemcarrinho[]>([]);

  items$: Observable<Itemcarrinho[]> = this.itemsSubject.asObservable();

  constructor() { }

  addToCart(peca: Peca): void {
    const currentItems = this.itemsSubject.getValue();
    const existingItem = currentItems.find(item => item.peca.id === peca.id);

    if (existingItem) {
      existingItem.quantidade++;
    } else {
      currentItems.push({ peca: peca, quantidade: 1 });
    }

    this.itemsSubject.next(currentItems);
    alert(`${peca.nome} foi adicionado ao carrinho!`);
  }

  removeFromCart(pecaId: number): void {
    const currentItems = this.itemsSubject.getValue().filter(item => item.peca.id !== pecaId);
    this.itemsSubject.next(currentItems);
  }

  clearCart(): void {
    this.itemsSubject.next([]);
  }
}