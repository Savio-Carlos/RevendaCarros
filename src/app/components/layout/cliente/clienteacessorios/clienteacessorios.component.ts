import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Compra } from '../../../../models/compra';
import { CompraService } from '../../../../services/compra.service';

@Component({
  selector: 'app-cliente-acessorios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clienteacessorios.component.html',
})
export class ClienteAcessoriosComponent implements OnInit {
  minhasCompras: Compra[] = [];

  constructor(private compraService: CompraService) {}

  ngOnInit(): void {
    this.compraService.getMinhasCompras().subscribe(data => {
      this.minhasCompras = data;
    });
  }
}