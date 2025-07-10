import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vendedor } from '../../../../models/vendedor';
import { GerenteService } from '../../../../services/gerente.service';
import { Venda } from '../../../../models/venda'; 
import { Carro } from '../../../../models/carro';
import { Peca } from '../../../../models/peca'; 

@Component({
  selector: 'app-gerente-equipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gerenteequipe.component.html',
})
export class GerenteEquipeComponent implements OnInit {
  vendedores: Vendedor[] = [];

  constructor(private gerenteService: GerenteService) {}

  ngOnInit(): void {
    this.gerenteService.getVendedoresComDesempenho().subscribe(data => {
      this.vendedores = data;
    });
  }

  calcularVendasMes(vendedor: Vendedor): number {
    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();
    
    return vendedor.vendas
      .filter(v => {
        const dataVenda = new Date(v.dataVenda);
        return dataVenda.getMonth() === mesAtual && dataVenda.getFullYear() === anoAtual;
      })
      .reduce((sum, v) => sum + v.valorFinal, 0);
  }

  getProgressoMeta(vendedor: Vendedor): number {
    const vendasMes = this.calcularVendasMes(vendedor);
    if (vendedor.metaMensal === 0) return 100;
    return Math.min(100, (vendasMes / vendedor.metaMensal) * 100);
  }

    getItemName(venda: Venda): string {
    if (venda.tipo === 'Carro') {
      return (venda.itemVendido as Carro).modelo;
    } else {
      return (venda.itemVendido as Peca).nome;
    }
  }
}