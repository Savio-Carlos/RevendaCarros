import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../../../../models/cliente';
import { GerenteService } from '../../../../services/gerente.service';
import { AddCarroService } from '../../../../services/addcarro.service';
import { AssociarCarroModalComponent } from '../../../carros/associarcarromodal/associarcarromodal.component';

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
    private modalService: NgbModal,
    private AddCarroService: AddCarroService
  ) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.gerenteService.getClientesCompletos().subscribe(data => {
      this.clientes = data;
    });
  }

  openAssociarCarroModal(cliente: Cliente): void {
    const modalRef = this.modalService.open(AssociarCarroModalComponent, { size: 'lg' });

    modalRef.result.then((carroSelecionado) => {
      if (carroSelecionado) {
        this.AddCarroService.associarCarroAoCliente(cliente.id, carroSelecionado).subscribe(() => {
          // Reload the client data to show the new car
          this.loadClientes();
          alert(`O carro ${carroSelecionado.modelo} foi registrado para ${cliente.nome} com sucesso!`);
        });
      }
    }).catch(() => {});
  }
    removerVeiculo(cliente: Cliente, veiculoId: number): void {
    const veiculo = cliente.veiculos.find(v => v.id === veiculoId);
    if (!veiculo) return;

    if (confirm(`Tem certeza que deseja remover o veículo ${veiculo.modelo} do cliente ${cliente.nome}?`)) {
      this.AddCarroService.desassociarCarroDoCliente(cliente.id, veiculoId).subscribe(() => {
        this.loadClientes(); // Recarrega a lista para atualizar a tela
        alert('Veículo removido com sucesso!');
      });
    }
  }
}