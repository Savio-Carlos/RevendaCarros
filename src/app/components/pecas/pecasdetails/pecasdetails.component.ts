import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Peca } from '../../../models/peca';
import { PecaService } from '../../../services/peca.service';
import { CarrinhoService } from '../../../services/carrinho.service';

@Component({
  selector: 'app-pecasdetails',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pecasdetails.component.html',
  styleUrl: './pecasdetails.component.scss'
})
export class PecasdetailsComponent implements OnInit {
  peca?: Peca;

  constructor(
    private route: ActivatedRoute,
    private pecaService: PecaService,
    private carrinho: CarrinhoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const pecaId = +idParam;
      this.pecaService.getById(pecaId).subscribe(data => {
        this.peca = data;
      });
    }
  }
  adicionarAoCarrinho(peca: Peca): void {
    if (peca) {
      this.carrinho.addToCart(peca);
    }
  }
}