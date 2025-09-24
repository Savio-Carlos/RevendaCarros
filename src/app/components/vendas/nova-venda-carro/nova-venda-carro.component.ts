import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../../../models/cliente';
import { Carro } from '../../../models/carro';
import { ClienteService } from '../../../services/cliente.service';
import { CarroService } from '../../../services/carro.service';
import { VendaService } from '../../../services/venda.service';
import { AuthService } from '../../../services/auth.service';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Funcionario } from '../../../models/funcionario';
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

  // Dropdown de funcionário
  funcionarios: Funcionario[] = [];
  funcionarioSelecionado?: number;
  precoVendaInput?: number;
  formaPagamentoInput: string = 'À vista';

  constructor(
  private clienteService: ClienteService,
  private carroService: CarroService,
  private vendaService: VendaService,
  private auth: AuthService,
  private funcionarioService: FuncionarioService,
  private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadClientes();
    this.loadCarros();
  this.loadFuncionarios();
  }

  loadClientes(): void {
    this.clienteService.getClientes().subscribe((data: any[]) => {
      // Normaliza para o modelo da tela
      this.clientes = (data || []).map((c: any) => ({
        id: c.id || c.idCliente || c.pessoa?.idPessoa,
        nome: c.pessoa?.nome || c.nome,
        email: c.pessoa?.emails?.[0]?.email || c.email || '',
        cpf: c.pessoa?.cpf || c.cpf || '',
        contato: c.pessoa?.telefone || c.contato || '',
        endereco: {
          cep: c.pessoa?.cep || '',
          logradouro: c.pessoa?.logradouro || '',
          numero: c.pessoa?.nroEndereco || '',
          complemento: c.pessoa?.complementoEndereco || '',
          bairro: c.pessoa?.bairro || '',
          localidade: c.pessoa?.cidade || '',
          uf: c.pessoa?.uf || ''
        },
        veiculos: c.veiculos || [],
        comprasPecas: c.comprasPecas || []
      })).filter(c => !!c.id);
    });
  }

  loadCarros(): void {
    this.carroService.getCarros().subscribe((data: Carro[]) => {
      // Disponíveis = status 1
      this.carrosDisponiveis = (data || []).filter(c => c.idStatusVeiculo === 1);
    });
  }

  loadFuncionarios(): void {
    this.funcionarioService.getFuncionarios().subscribe((list) => {
      this.funcionarios = list || [];
    });
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

  // Requer um ID de funcionário válido para evitar 400 (Funcionario não encontrado)
  const idFuncionario = Number(this.funcionarioSelecionado);
    if (!Number.isFinite(idFuncionario) || idFuncionario <= 0) {
      alert('Informe um ID de Vendedor (Funcionário) válido que exista no banco.');
      return;
    }

    const payload = {
      idCliente: this.clienteSelecionado.id,
      idFuncionario: idFuncionario,
      numChassiVeiculo: this.carroSelecionado.numChassi,
      precoVendaVeiculo: Number(this.precoVendaInput) || this.carroSelecionado.precoVeiculo,
      formaPagamento: (this.formaPagamentoInput || 'À vista')
    };

  // Debug rápido
  console.debug('[Venda] POST payload:', payload);

  this.vendaService.criarVenda(payload).subscribe({
      next: (res) => {
        alert(`Venda criada (ID ${res.idVenda}). Veículo marcado como vendido.`);
        // Limpa a tela para uma nova venda
        this.clienteSelecionado = undefined;
        this.carroSelecionado = undefined;
        this.loadCarros(); // atualiza a lista para remover o vendido
        this.loadClientes(); // opcional: se a tela exibe algo dependente
      },
      error: (err) => {
        const msg = typeof err?.error === 'string' ? err.error : (err?.error?.message || err?.message || 'erro desconhecido');
        alert('Falha ao concluir venda: ' + msg);
      }
    });
  }
}