import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../../../../models/cliente';
import { GerenteService } from '../../../../services/gerente.service';
import { AddCarroService } from '../../../../services/addcarro.service';
import { AssociarCarroModalComponent } from '../../../carros/associarcarromodal/associarcarromodal.component';
import { ClienteService } from '../../../../services/cliente.service';
import { VeiculoCliente } from '../../../../models/veiculocliente';

@Component({
  selector: 'app-gerente-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gerenteclientes.component.html',
})
export class GerenteclientesComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(
  private gerenteService: GerenteService,
  private clienteService: ClienteService,
    private modalService: NgbModal,
    private AddCarroService: AddCarroService
  ) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data: any[]) => {
        // Mapeia campos considerando a estrutura do backend (pessoa aninhada)
        this.clientes = (data || []).map((c: any) => ({
          id: c.id ?? c.idCliente ?? 0,
          nome: c.pessoa?.nome ?? c.nome ?? c.nomeCompleto ?? '—',
          email: c.pessoa?.email ?? c.email ?? c.contatoEmail ?? '—',
          cpf: c.pessoa?.cpf ?? c.cpf ?? '—',
          contato: c.pessoa?.telefone
                   ?? (Array.isArray(c.telefones) && c.telefones.length > 0 ? c.telefones[0]?.numeroTelefone : undefined)
                   ?? c.contato ?? c.telefone ?? '—',
          endereco: {
            cep: c.pessoa?.cep ?? '',
            logradouro: c.pessoa?.logradouro ?? '',
            numero: (c.pessoa?.nroEndereco != null && c.pessoa?.nroEndereco !== 0) ? String(c.pessoa.nroEndereco) : '',
            bairro: c.pessoa?.bairro ?? '',
            localidade: c.pessoa?.cidade ?? '',
            uf: c.pessoa?.uf ?? ''
          },
          veiculos: (c.veiculos ?? c.carros ?? []).map((v: any) =>
            Object.assign(new VeiculoCliente(), {
              numChassi: v.numChassi ?? v.chassi ?? '',
              placa: v.placa ?? '',
              marcaCarro: v.marcaCarro ?? v.marca ?? '',
              modeloVeiculo: v.modeloVeiculo ?? v.modelo ?? '',
              anoModelo: v.anoModelo ?? v.ano ?? 0,
              quilometragem: v.quilometragem ?? 0,
              cor: v.cor ?? '',
              precoVeiculo: v.precoVeiculo ?? v.preco ?? 0,
              descricao: v.descricao ?? '',
              fotos: v.fotos ?? v.imagemUrl ?? '',
              idStatusVeiculo: v.idStatusVeiculo ?? 1,
              dataCompra: v.dataCompra ? new Date(v.dataCompra) : undefined,
              quilometragemAtual: v.quilometragemAtual ?? v.quilometragem ?? 0,
              revisoes: v.revisoes ?? []
            })
          ),
          comprasPecas: c.comprasPecas ?? []
        }));
      },
      error: (err) => {
        console.error('Erro ao carregar clientes', err);
        this.clientes = [];
      }
    });
  }

  openAssociarCarroModal(cliente: Cliente): void {
    const modalRef = this.modalService.open(AssociarCarroModalComponent, { size: 'lg' });

    modalRef.result.then((carroSelecionado) => {
      if (carroSelecionado) {
        this.AddCarroService.associarCarroAoCliente(cliente.id, carroSelecionado).subscribe(() => {
          // Reload the client data to show the new car
          this.loadClientes();
          alert(`O carro ${carroSelecionado.modeloVeiculo} foi registrado para ${cliente.nome} com sucesso!`);
        });
      }
    }).catch(() => {});
  }
    removerVeiculo(cliente: Cliente, veiculoChassi: string): void {
    const veiculo = cliente.veiculos.find(v => v.numChassi === veiculoChassi);
    if (!veiculo) return;

    if (confirm(`Tem certeza que deseja remover o veículo ${veiculo.modeloVeiculo} do cliente ${cliente.nome}?`)) {
      this.AddCarroService.desassociarCarroDoCliente(cliente.id, veiculoChassi).subscribe(() => {
        this.loadClientes(); // Recarrega a lista para atualizar a tela
        alert('Veículo removido com sucesso!');
      });
    }
  }
}