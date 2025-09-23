import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importe o NgbActiveModal
import { ClienteService } from '../../../services/cliente.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './registromodal.component.html',
  providers: [provideNgxMask()] // <<< ADICIONE ESTA LINHA
})

export class RegistromodalComponent {
  // Injeções de serviço
  activeModal = inject(NgbActiveModal); // Injeção para controlar o modal
  clienteService = inject(ClienteService);

  // Objeto para guardar os dados do formulário (o HTML espera este nome)
  newUser: any = {};

  // Método chamado quando o formulário é submetido
  registrar() {
    // O JSON que vamos enviar para o backend
    const payload = {
      senhaHash: this.newUser.senha,
      nome: this.newUser.nome,
      cpf: this.newUser.cpf,
      dataNascimento: this.newUser.dataNascimento,
      email: this.newUser.email
    };

    this.clienteService.addCliente(payload).subscribe({
      next: (response) => {
        console.log('Cliente registrado com sucesso!', response);
        alert('Cliente registrado com sucesso!');
        this.activeModal.close(); // Fecha o modal com sucesso
      },
      error: (err) => {
        console.error('Erro ao registrar cliente', err);
        // Exibe a mensagem de erro que vem do nosso backend Java!
        alert(`Erro: ${err.error}`); 
      }
    });
  }

  // O HTML também espera uma função buscarCep, vamos adicionar uma vazia por enquanto
  buscarCep() {
    console.log("Função buscar CEP ainda não implementada.");
  }
}