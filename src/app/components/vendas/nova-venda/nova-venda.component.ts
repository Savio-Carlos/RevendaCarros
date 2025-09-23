import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../../../models/cliente';
import { Peca } from '../../../models/peca';
import { Itemcarrinho } from '../../../models/itemcarrinho';
import { GerenteService } from '../../../services/gerente.service';
import { PecaService } from '../../../services/peca.service';
import { RegistromodalComponent } from '../../layout/registromodal/registromodal.component';

@Component({
  selector: 'app-nova-venda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nova-venda.component.html',
})
export class NovaVendaComponent implements OnInit {
    clientes: Cliente[] = [];
  todasAsPecas: Peca[] = []; // ✅ Armazena a lista completa e original de peças
  pecasFiltradas: Peca[] = []; // ✅ Armazena a lista filtrada para exibição

  // Dados da venda atual
  clienteSelecionado?: Cliente;
  pecaSelecionada?: Peca;
  quantidadePeca = 1;
  itensDaVenda: Itemcarrinho[] = [];
  totalDaVenda = 0;
  
  termoBuscaPeca: string = ''; // ✅ Nova propriedade para o termo de busca

constructor(
    private gerenteService: GerenteService,
    private pecaService: PecaService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadClientes();
    this.loadPecas();
  }

  loadClientes(): void {
    this.gerenteService.getClientesCompletos().subscribe(data => this.clientes = data);
  }

  loadPecas(): void {
    this.pecaService.getAll().subscribe(data => {
      this.todasAsPecas = data;
      this.pecasFiltradas = data; // Inicialmente, a lista filtrada é a lista completa
    });
  }
  
  // ✅ NOVO MÉTODO PARA FILTRAR AS PEÇAS
  filtrarPecas(): void {
    if (!this.termoBuscaPeca) {
      this.pecasFiltradas = this.todasAsPecas;
    } else {
      this.pecasFiltradas = this.todasAsPecas.filter(peca => 
        peca.nome.toLowerCase().includes(this.termoBuscaPeca.toLowerCase())
      );
    }
  }

  abrirModalCadastroCliente(): void {
    const modalRef = this.modalService.open(RegistromodalComponent, { size: 'lg' });
    modalRef.result.then((novoCliente) => {
      if (novoCliente) {

        const clienteParaAdicionar: Cliente = { id: Math.random(), ...novoCliente, veiculos: [], comprasPecas: [] };
        this.clientes.push(clienteParaAdicionar);
        this.clienteSelecionado = clienteParaAdicionar;
        alert(`Cliente ${novoCliente.nome} cadastrado e selecionado para a venda!`);
      }
    }).catch(() => {});
  }

  adicionarPeca(): void {
    if (!this.pecaSelecionada || this.quantidadePeca <= 0) {
      alert('Por favor, selecione uma peça e uma quantidade válida.');
      return;
    }

    const itemExistente = this.itensDaVenda.find(item => item.peca.id === this.pecaSelecionada!.id);

    if (itemExistente) {
      itemExistente.quantidade += this.quantidadePeca;
    } else {
      this.itensDaVenda.push({ peca: this.pecaSelecionada, quantidade: this.quantidadePeca });
    }

    this.calcularTotal();
  }
  
  removerPeca(pecaId: number): void {
    this.itensDaVenda = this.itensDaVenda.filter(item => item.peca.id !== pecaId);
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.totalDaVenda = this.itensDaVenda.reduce((sum, item) => sum + (item.peca.preco * item.quantidade), 0);
  }

  finalizarVenda(): void {
    if (!this.clienteSelecionado) {
      alert('Por favor, selecione um cliente.');
      return;
    }
    if (this.itensDaVenda.length === 0) {
      alert('Por favor, adicione pelo menos uma peça à venda.');
      return;
    }

    // A lógica para gerar a nota fiscal viria aqui
    alert(`Venda finalizada para o cliente ${this.clienteSelecionado.nome} no valor de ${this.totalDaVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}!`);
    
    // Limpar o formulário para uma nova venda
    this.clienteSelecionado = undefined;
    this.itensDaVenda = [];
    this.totalDaVenda = 0;
  }
}