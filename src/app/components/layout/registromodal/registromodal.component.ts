import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './registromodal.component.html',
  providers: [provideNgxMask()]
})
export class RegisterModalComponent {
  newUser = {
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
    contato: ''
  };

  constructor(
    public activeModal: NgbActiveModal,
    private http: HttpClient
  ) {}

  buscarCep() {
    const cep = this.newUser.cep.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((data: any) => {
        if (!data.erro) {
          this.newUser.logradouro = data.logradouro;
          this.newUser.bairro = data.bairro;
          this.newUser.localidade = data.localidade;
          this.newUser.uf = data.uf;
        } else {
          alert('CEP não encontrado.');
        }
      });
    }
  }

  register(): void {
    console.log('Registering new client:', this.newUser);
    this.activeModal.close(this.newUser);
    alert('Cadastro realizado com sucesso! (Verifique o console para ver os dados)');
  }
}