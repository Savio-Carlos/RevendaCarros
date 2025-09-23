import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../../../models/cliente';
import { Carro } from '../../../models/carro';
import { GerenteService } from '../../../services/gerente.service';
import { AddCarroService } from '../../../services/addcarro.service';
import { RegistromodalComponent } from '../../layout/registromodal/registromodal.component';

@Component({
  selector: 'app-nova-venda-carro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nova-venda-carro.component.html',
})
export class NovaVendaCarroComponent implements OnInit {

  clientes: Cliente[] = [];
  carrosDisponiveis: Carro[] = [];

  clienteSelecionado?: Cliente;
  carroSelecionado?: Carro;

  constructor(
    private gerenteService: GerenteService,
    private associacaoService: AddCarroService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadClientes();
    this.loadCarros();
  }

  loadClientes(): void {
    this.gerenteService.getClientesCompletos().subscribe(data => this.clientes = data);
  }

  loadCarros(): void {
    this.associacaoService.getCarrosDisponiveis().subscribe(data => this.carrosDisponiveis = data);
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

  finalizarVenda(): void {
    if (!this.clienteSelecionado || !this.carroSelecionado) {
      alert('Por favor, selecione um cliente e um carro para continuar.');
      return;
    }

    // A lógica para registrar a venda no backend viria aqui.
    // Por enquanto, vamos apenas simular a associação.
    this.associacaoService.associarCarroAoCliente(this.clienteSelecionado.id, this.carroSelecionado).subscribe(() => {
      alert(`Venda do ${this.carroSelecionado!.modeloVeiculo} para ${this.clienteSelecionado!.nome} oficializada com sucesso!`);
      
      // Limpa a tela para uma nova venda
      this.clienteSelecionado = undefined;
      this.carroSelecionado = undefined;
      this.loadCarros(); // Recarrega a lista de carros, pois um foi "vendido"
    });
  }
}