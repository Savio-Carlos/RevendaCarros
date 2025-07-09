import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for async pipe
import { CarrinhoService } from '../../../services/carrinho.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  cartItemCount$: Observable<number> | undefined;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.cartItemCount$ = this.carrinhoService.items$.pipe(
      map(items => items.reduce((sum, item) => sum + item.quantidade, 0))
    );
  }
}