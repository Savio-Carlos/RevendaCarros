import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeiculoCliente } from '../../../../models/veiculocliente';
import { ClienteService } from '../../../../services/cliente.service';

@Component({
  selector: 'app-cliente-meus-carros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientemeuscarros.component.html',
})
export class ClienteMeusCarrosComponent implements OnInit {
  meusVeiculos: VeiculoCliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getMeusVeiculos().subscribe(data => {
      this.meusVeiculos = data;
    });
  }

  // Lógica de Garantia
  getProximaRevisaoKm(veiculo: VeiculoCliente): number {
    if (!veiculo.revisoes || veiculo.revisoes.length === 0) {
      return 10000;
    }
    const ultimaRevisaoKm = Math.max(...veiculo.revisoes.map(r => r.quilometragem));
    return Math.floor(ultimaRevisaoKm / 10000) * 10000 + 10000;
  }

  getProgressoRevisao(veiculo: VeiculoCliente): number {
    const proximaRevisaoKm = this.getProximaRevisaoKm(veiculo);
    const ultimaRevisaoKm = proximaRevisaoKm - 10000;
    const progressoNoIntervalo = veiculo.quilometragemAtual - ultimaRevisaoKm;
    return Math.min(100, (progressoNoIntervalo / 10000) * 100);
  }

  getStatusGarantia(veiculo: VeiculoCliente): { status: string, classe: string } {
    const dataExpiracaoGarantia = new Date(veiculo.dataCompra);
    dataExpiracaoGarantia.setFullYear(dataExpiracaoGarantia.getFullYear() + 2);

    if (new Date() > dataExpiracaoGarantia) {
      return { status: 'Expirada', classe: 'danger' };
    }

    const proximaRevisaoKm = this.getProximaRevisaoKm(veiculo);
    if (veiculo.quilometragemAtual > proximaRevisaoKm + 1000) {
      return { status: 'Perdida (Revisão Atrasada)', classe: 'danger' };
    }

    return { status: 'Ativa', classe: 'success' };
  }

  getDataExpiracaoGarantia(veiculo: VeiculoCliente): Date {
    const dataExpiracao = new Date(veiculo.dataCompra);
    dataExpiracao.setFullYear(dataExpiracao.getFullYear() + 2);
    return dataExpiracao;
  }
}