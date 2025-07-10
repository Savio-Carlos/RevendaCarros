import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../../../../models/cliente';
import { VeiculoCliente } from '../../../../models/veiculocliente';
import { Peca } from '../../../../models/peca';
import { Servico } from '../../../../models/servico';
import { Revisao } from '../../../../models/revisao';
import { GerenteService } from '../../../../services/gerente.service';
import { PecaService } from '../../../../services/peca.service';
import { ServicoService } from '../../../../services/servico.service';
import { OrdemServicoService } from '../../../../services/ordem-servico.service';
import { RegisterModalComponent } from '../../registromodal/registromodal.component';

@Component({
  selector: 'app-mecanico-nova-ordem',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mecanico-nova-ordem.component.html',
})
export class MecanicoNovaOrdemComponent implements OnInit {

  // Listas para seleção
  clientes: Cliente[] = [];
  pecasDisponiveis: Peca[] = [];
  servicosDisponiveis: Servico[] = [];

  // Dados da Ordem de Serviço atual
  clienteSelecionado?: Cliente;
  veiculoSelecionado?: VeiculoCliente;
  servicosSelecionados: Servico[] = [];
  pecasSelecionadas: Peca[] = [];
  quilometragemAtual = 0;
  custoTotal = 0;

  constructor(
    private gerenteService: GerenteService,
    private pecaService: PecaService,
    private servicoService: ServicoService,
    private ordemServicoService: OrdemServicoService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.gerenteService.getClientesCompletos().subscribe(data => this.clientes = data);
    this.pecaService.getAll().subscribe(data => this.pecasDisponiveis = data);
    this.servicoService.getAll().subscribe(data => this.servicosDisponiveis = data);
  }

  abrirModalCadastroCliente(): void {
    const modalRef = this.modalService.open(RegisterModalComponent, { size: 'lg' });
    modalRef.result.then((novoCliente) => {
      if (novoCliente) {
        const clienteParaAdicionar: Cliente = { id: Math.random(), ...novoCliente, veiculos: [], comprasPecas: [] };
        this.clientes.push(clienteParaAdicionar);
        this.clienteSelecionado = clienteParaAdicionar;
      }
    }).catch(() => {});
  }

  onClienteChange(): void {
    this.veiculoSelecionado = undefined; // Reseta o veículo ao trocar de cliente
  }

  adicionarServico(servico: Servico): void {
    if (servico && !this.servicosSelecionados.find(s => s.id === servico.id)) {
      this.servicosSelecionados.push(servico);
      this.calcularTotal();
    }
  }

  adicionarPeca(peca: Peca): void {
    if (peca && !this.pecasSelecionadas.find(p => p.id === peca.id)) {
      this.pecasSelecionadas.push(peca);
      this.calcularTotal();
    }
  }

  removerItem(tipo: 'servico' | 'peca', id: number): void {
    if (tipo === 'servico') {
      this.servicosSelecionados = this.servicosSelecionados.filter(s => s.id !== id);
    } else {
      this.pecasSelecionadas = this.pecasSelecionadas.filter(p => p.id !== id);
    }
    this.calcularTotal();
  }

  calcularTotal(): void {
    const totalServicos = this.servicosSelecionados.reduce((sum, s) => sum + s.preco, 0);
    const totalPecas = this.pecasSelecionadas.reduce((sum, p) => sum + p.preco, 0);
    this.custoTotal = totalServicos + totalPecas;
  }

  emitirOrdem(): void {
    if (!this.clienteSelecionado || !this.veiculoSelecionado) {
      alert('Por favor, selecione um cliente e um veículo.');
      return;
    }

    const novaOrdem: Revisao = {
      id: 0, // Será gerado pelo serviço
      data: new Date(),
      quilometragem: this.quilometragemAtual,
      servicosRealizados: this.servicosSelecionados,
      pecasTrocadas: this.pecasSelecionadas,
      mecanicoResponsavel: 'Mecânico Logado', 
      status: 'Concluído', // O serviço já define como 'Em Aberto', mas mantemos para garantir
      custoTotal: this.custoTotal,
      // ✅ PROPRIEDADES ADICIONADAS PARA CORRIGIR O ERRO
      clienteNome: this.clienteSelecionado.nome,
      veiculoDescricao: `${this.veiculoSelecionado.modelo} (${this.veiculoSelecionado.marca})`
    };

    this.ordemServicoService.criarOrdem(novaOrdem).subscribe(() => {
      alert('Nova Ordem de Serviço emitida com sucesso!');
      // Limpa o formulário
      this.clienteSelecionado = undefined;
      this.veiculoSelecionado = undefined;
      this.servicosSelecionados = [];
      this.pecasSelecionadas = [];
      this.custoTotal = 0;
      this.quilometragemAtual = 0;
    });
  }
}