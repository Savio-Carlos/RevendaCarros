import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VeiculoCliente } from '../../../models/veiculocliente';

@Component({
  selector: 'app-registrar-veiculo-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-veiculo-modal.component.html',
})
export class RegistrarVeiculoModalComponent {

  // Usamos um objeto parcial, pois não precisamos de todos os campos de um carro de venda
  novoVeiculo = {
    modeloVeiculo: '',
    marcaCarro: '',
    anoModelo: new Date().getFullYear(),
    placa: '' // Campo importante para identificação na oficina
  };

  constructor(public activeModal: NgbActiveModal) {}

  salvar(): void {
  if (!this.novoVeiculo.marcaCarro || !this.novoVeiculo.modeloVeiculo || !this.novoVeiculo.placa) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    // Passa o objeto de volta para o componente que o chamou
    this.activeModal.close(this.novoVeiculo);
  }
}