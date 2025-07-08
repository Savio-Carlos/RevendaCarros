// src/app/components/contato-modal/contato-modal.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http'; 
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-contato-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective], // Import FormsModule for ngModel
  templateUrl: './contatomodal.component.html',
   providers: [provideNgxMask()]
})
export class ContatoModalComponent {
  // This object will hold the data from our form
  formData = {
    nome: '',
    cpf: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
    contato: '',
    email: ''
  };

  constructor(
    public activeModal: NgbActiveModal,
    private http: HttpClient
  ) {}

  // ✅ 4. Create the method to search for the CEP
  buscarCep() {
    const cep = this.formData.cep.replace(/\D/g, ''); // Remove non-digit characters

    if (cep.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((data: any) => {
        if (!data.erro) {
          // Populate fields with the data from the API
          this.formData.logradouro = data.logradouro;
          this.formData.bairro = data.bairro;
          this.formData.localidade = data.localidade;
          this.formData.uf = data.uf;
        } else {
          alert('CEP não encontrado.');
        }
      });
    }
  }

  submitForm() {
    // For now, we'll just log the data to the console
    console.log('Form data submitted:', this.formData);
    
    // You can pass data back to the component that opened the modal
    this.activeModal.close(this.formData);
  }
}