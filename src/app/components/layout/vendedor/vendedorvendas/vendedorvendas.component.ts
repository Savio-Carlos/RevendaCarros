import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Venda } from '../../../../models/venda';
import { Carro } from '../../../../models/carro';
import { Peca } from '../../../../models/peca';
import { VendaService } from '../../../../services/venda.service';

@Component({
  selector: 'app-vendedor-vendas',
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule is needed for ngModel
  templateUrl: './vendedorvendas.component.html',
})
export class VendedorvendasComponent implements OnInit {

  todasAsVendas: Venda[] = [];
  vendasFiltradas: Venda[] = [];
  
  dataInicio?: string;
  dataFim?: string;

  constructor(private vendaService: VendaService) {}

  ngOnInit(): void {
    this.vendaService.getVendas().subscribe(vendas => {
      this.todasAsVendas = vendas;
      this.vendasFiltradas = vendas; // Initially, show all sales
    });
  }

  filtrarVendas(): void {
    if (!this.dataInicio || !this.dataFim) {
      this.vendasFiltradas = this.todasAsVendas; // If dates are cleared, show all
      return;
    }

    const inicio = new Date(this.dataInicio);
    const fim = new Date(this.dataFim);
    // Set hours to include the full start and end days
    inicio.setHours(0, 0, 0, 0);
    fim.setHours(23, 59, 59, 999);

    this.vendasFiltradas = this.todasAsVendas.filter(venda => {
      const dataVenda = new Date(venda.dataVenda);
      return dataVenda >= inicio && dataVenda <= fim;
    });
  }

  limparFiltro(): void {
    this.dataInicio = undefined;
    this.dataFim = undefined;
    this.vendasFiltradas = this.todasAsVendas;
  }

  calcularTotal(): number {
    return this.vendasFiltradas.reduce((acc, venda) => acc + venda.valorFinal, 0);
  }

    getItemName(venda: Venda): string {
    // Check the 'tipo' property to decide which property to access
    if (venda.tipo === 'Carro') {
      // We cast the item to 'Carro' so TypeScript knows 'modelo' is available
      return (venda.itemVendido as Carro).modelo;
    } else {
      // Otherwise, we cast to 'Peca' to access 'nome'
      return (venda.itemVendido as Peca).nome;
    }
  }
}