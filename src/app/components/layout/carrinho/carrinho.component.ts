import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Itemcarrinho } from '../../../models/itemcarrinho';
import { CarrinhoService } from '../../../services/carrinho.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrinho.component.html',
})
export class CarrinhoComponent implements OnInit {
  cartItems$: Observable<Itemcarrinho[]>;
  totalPrice = 0;

  constructor(private cartService: CarrinhoService) {
    this.cartItems$ = this.cartService.items$;
  }

  ngOnInit(): void {
    this.cartItems$.subscribe(items => {
      this.totalPrice = items.reduce((sum, item) => sum + (item.peca.preco * item.quantidade), 0);
    });
  }

  removerDoCarrinho(pecaId: number): void {
    this.cartService.removeFromCart(pecaId);
  }
}