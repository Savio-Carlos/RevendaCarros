import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { Venda } from '../../../../models/venda';
import { VendaService } from '../../../../services/venda.service';
import { Peca } from '../../../../models/peca';
import { PecaService } from '../../../../services/peca.service';
import { Carro } from '../../../../models/carro';

Chart.register(...registerables);

@Component({
  selector: 'app-gerente-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gerentedashboard.component.html',
})
export class GerentedashboardComponent implements OnInit, AfterViewInit {
  
  totalVendasMes = 0;
  totalCarrosVendidos = 0;
  totalPecasVendidas = 0;

  ultimasVendas: Venda[] = [];
  pecasEstoqueBaixo: Peca[] = [];
  lowStockThreshold = 10;

  constructor(
    private vendaService: VendaService,
    private pecaService: PecaService
  ) {}

  ngOnInit(): void {

    this.vendaService.getVendas().subscribe(vendas => {
      const vendasEsteMes = vendas.filter(v => new Date(v.dataVenda).getMonth() === new Date().getMonth());
      
      this.totalVendasMes = vendasEsteMes.reduce((sum, venda) => sum + venda.valorFinal, 0);
      this.totalCarrosVendidos = vendasEsteMes.filter(v => v.tipo === 'Carro').length;
      this.totalPecasVendidas = vendasEsteMes.filter(v => v.tipo === 'Peça').length;

      this.ultimasVendas = vendas.sort((a, b) => new Date(b.dataVenda).getTime() - new Date(a.dataVenda).getTime()).slice(0, 5);
    });

    this.pecaService.getAll().subscribe(pecas => {
      this.pecasEstoqueBaixo = pecas.filter(p => p.estoque <= this.lowStockThreshold);
    });
  }

  ngAfterViewInit(): void {
    this.createSalesChart();
  }

  createSalesChart(): void {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
          datasets: [{
            label: 'Vendas Totais (R$)',
            data: [120000, 190000, 150000, 210000, 180000, 250000],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
    getItemName(venda: Venda): string {
    if (venda.tipo === 'Carro') {
      return (venda.itemVendido as Carro).modelo;
    } else {
      return (venda.itemVendido as Peca).nome;
    }
  }
}