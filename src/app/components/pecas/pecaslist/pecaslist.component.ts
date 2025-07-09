import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Peca } from '../../../models/peca';
import { PecaService } from '../../../services/peca.service';
import { PecasfilterComponent, PecasFilter } from '../pecasfilter/pecasfilter.component';
import { CarrinhoService } from '../../../services/carrinho.service';

@Component({
  selector: 'app-pecaslist',
  standalone: true,
  imports: [CommonModule, RouterModule, PecasfilterComponent],
  templateUrl: './pecaslist.component.html',
  styleUrl: './pecaslist.component.scss'
})
export class PecaslistComponent implements OnInit {
  pecas: Peca[] = [];
  pecasFiltradas: Peca[] = [];

    constructor(private pecaService: PecaService, private carrinho: CarrinhoService) {}

  ngOnInit(): void {
    this.pecaService.getAll().subscribe(data => {
      this.pecas = data;
      this.pecasFiltradas = data;
    });
  }

  onFilterChange(filter: PecasFilter): void {
    this.pecasFiltradas = this.pecas.filter(peca => {
      let match = true;
      if (filter.nome && !peca.nome.toLowerCase().includes(filter.nome.toLowerCase())) {
        match = false;
      }
      if (filter.marca && !peca.marca.toLowerCase().includes(filter.marca.toLowerCase())) {
        match = false;
      }
      if (filter.precoMax != null && peca.preco > filter.precoMax) {
        match = false;
      }
      return match;
    });
  }

  adicionarAoCarrinho(peca: Peca): void {
    this.carrinho.addToCart(peca);
  }
}