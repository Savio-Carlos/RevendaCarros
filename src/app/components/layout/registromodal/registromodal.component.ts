import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importe o NgbActiveModal
import { ClienteService } from '../../../services/cliente.service';
import { EnderecoService } from '../../../services/endereco.service';
import { switchMap, of } from 'rxjs';
import { ViaCepService } from '../../../services/viacep.service';
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
  enderecoService = inject(EnderecoService);
  viaCepService = inject(ViaCepService);

  // Objeto para guardar os dados do formulário (o HTML espera este nome)
  newUser: any = {};
  // Guarda dados retornados do ViaCEP para enviar como metadados no auto-seed
  private viaCepMeta: Partial<import('../../../services/viacep.service').ViaCepResponse> | null = null;

  // Mapa simples de sigla -> nome completo da UF para enriquecer o auto-seed
  private readonly UF_NOMES: Record<string, string> = {
    AC: 'Acre', AL: 'Alagoas', AM: 'Amazonas', AP: 'Amapá', BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal',
    ES: 'Espírito Santo', GO: 'Goiás', MA: 'Maranhão', MG: 'Minas Gerais', MS: 'Mato Grosso do Sul', MT: 'Mato Grosso',
    PA: 'Pará', PB: 'Paraíba', PE: 'Pernambuco', PI: 'Piauí', PR: 'Paraná', RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte',
    RO: 'Rondônia', RR: 'Roraima', RS: 'Rio Grande do Sul', SC: 'Santa Catarina', SE: 'Sergipe', SP: 'São Paulo', TO: 'Tocantins'
  };

  private sanitizeDigits(value: string | undefined | null): string {
    return (value || '').replace(/\D/g, '');
  }

  private isValidEmail(email: string | undefined): boolean {
    return !!email && /.+@.+\..+/.test(email);
  }

  private isValidCPF(cpf: string | undefined): boolean {
    const digits = this.sanitizeDigits(cpf);
    return digits.length === 11; // validação simples por comprimento
  }

  private isValidSenha(s: string | undefined): boolean {
    return !!s && s.trim().length >= 3;
  }

  private isValidTelefone(tel: string | undefined): boolean {
    const digits = this.sanitizeDigits(tel);
    return digits.length >= 10 && digits.length <= 11; // celular fixo/br
  }

  // Método chamado quando o formulário é submetido
  registrar() {
    // Validações básicas de frontend
    if (!this.isValidSenha(this.newUser.senha)) {
      alert('A senha deve ter pelo menos 3 caracteres.');
      return;
    }
    if (!this.isValidCPF(this.newUser.cpf)) {
      alert('CPF inválido.');
      return;
    }
    if (!this.isValidEmail(this.newUser.email)) {
      alert('Email inválido.');
      return;
    }
    if (!this.isValidTelefone(this.newUser.contato)) {
      alert('Telefone inválido. Use DDD + número.');
      return;
    }

    const telefone = this.sanitizeDigits(this.newUser.contato);
    const cpfDigits = this.sanitizeDigits(this.newUser.cpf);

    // JSON alinhado ao backend (ClienteHTTP)
    const payload: any = {
      senhaHash: this.newUser.senha?.trim(),
      nome: (this.newUser.nome || '').trim(),
      cpf: cpfDigits,
      dataNascimento: this.newUser.dataNascimento,
      email: (this.newUser.email || '').trim(),
      telefone: telefone,
      complementoEndereco: this.newUser.complemento || ''
    };

    // idEndereco: tentar criar endereço se CEP/numero presentes; se falhar, prosseguir sem idEndereco
    const cepDigits = this.sanitizeDigits(this.newUser.cep);
    const numeroEndereco = (this.newUser.numero || '').toString().trim();

    const tryCreateEndereco = () => {
      if (cepDigits.length === 8 && numeroEndereco) {
        const complemento = (this.newUser.complemento ?? '').toString().trim();
        const endPayload: any = {
          logradouroCEP: cepDigits,
          numeroEndereco: numeroEndereco,
          complementoEndereco: complemento.length > 0 ? complemento : null
          // referencia pode ser adicionada futuramente
        };
        // Deriva sigla do logradouro (Rua -> R, Avenida -> Av, Travessa -> Tv, Rodovia -> Rod, Alameda -> Al, Praça -> Pc)
        const deriveSiglaLog = (logradouro?: string): string | undefined => {
          if (!logradouro) return undefined;
          const l = logradouro.trim().toLowerCase();
          if (l.startsWith('avenida')) return 'Av';
          if (l.startsWith('rua')) return 'R';
          if (l.startsWith('travessa')) return 'Tv';
          if (l.startsWith('rodovia')) return 'Rod';
          if (l.startsWith('alameda')) return 'Al';
          if (l.startsWith('praça') || l.startsWith('praca')) return 'Pc';
          if (l.startsWith('estrada')) return 'Est';
          return undefined;
        };

        const meta = this.viaCepMeta ? {
          uf: this.viaCepMeta.uf,
          nomeUF: this.UF_NOMES[(this.viaCepMeta.uf || '').toUpperCase()] || this.viaCepMeta.uf,
          cidade: this.viaCepMeta.localidade,
          bairro: this.viaCepMeta.bairro,
          logradouro: this.viaCepMeta.logradouro,
          siglaLog: deriveSiglaLog(this.viaCepMeta.logradouro)
        } : undefined;

        // Debug para investigar 500 e checar campos enviados
        console.debug('[Endereco] POST body:', endPayload, 'meta:', meta);

        return this.enderecoService.createEndereco(endPayload, meta);
      }
      return of(null);
    };

    tryCreateEndereco().pipe(
      switchMap((idEndereco) => {
        if (idEndereco && Number.isFinite(idEndereco)) {
          payload.idEndereco = idEndereco;
        }
        return this.clienteService.addCliente(payload);
      })
    ).subscribe({
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
    const digits = this.sanitizeDigits(this.newUser.cep);
    if (digits.length !== 8) return;
    this.viaCepService.lookup(digits).subscribe((res) => {
      if (!res) return;
  this.viaCepMeta = res; // guarda para uso no auto-seed
      // Preenche campos se vazios
      if (!this.newUser.logradouro) this.newUser.logradouro = res.logradouro || '';
      if (!this.newUser.bairro) this.newUser.bairro = res.bairro || '';
      if (!this.newUser.localidade) this.newUser.localidade = res.localidade || '';
      if (!this.newUser.uf) this.newUser.uf = res.uf || '';
      if (!this.newUser.complemento) this.newUser.complemento = res.complemento || '';
    });
  }
}