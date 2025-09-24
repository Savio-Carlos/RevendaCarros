import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Carro } from '../../../../models/carro';
import { VendaService, CriarVendaPayload } from '../../../../services/venda.service';
import { ClienteService } from '../../../../services/cliente.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-vender-carro-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="modal-header">
    <h5 class="modal-title">Vender veículo</h5>
    <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss()"></button>
  </div>
  <div class="modal-body">
    <div class="mb-3">
      <label class="form-label">Veículo</label>
      <div class="form-control" disabled>
        {{ carro?.marcaCarro }} {{ carro?.modeloVeiculo }} — Chassi {{ carro?.numChassi }}
      </div>
    </div>
    <div class="row">
      <div class="col-md-7 mb-3">
        <label class="form-label">Cliente</label>
        <select class="form-select" [(ngModel)]="form.idCliente">
          <option [ngValue]="undefined">Selecione um cliente…</option>
          <option *ngFor="let c of clientes" [ngValue]="c.id">{{ c.nome }} — {{ c.cpf }}</option>
        </select>
      </div>
      <div class="col-md-5 mb-3">
        <label class="form-label">Vendedor (id)</label>
        <input class="form-control" type="number" [(ngModel)]="form.idFuncionario" min="1" />
        <div class="form-text">Pré-preenchido pelo login.</div>
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label">Preço de Venda</label>
      <input class="form-control" type="number" step="0.01" [(ngModel)]="form.precoVendaVeiculo" />
    </div>
    <div class="mb-3">
      <label class="form-label">Forma de Pagamento</label>
      <input class="form-control" type="text" [(ngModel)]="form.formaPagamento" placeholder="Ex: Cartão em 12x" />
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss()">Cancelar</button>
    <button type="button" class="btn btn-success" (click)="confirmarVenda()">Confirmar Venda</button>
  </div>
  `,
})
export class VenderCarroModalComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  private vendaService = inject(VendaService);
  private clienteService = inject(ClienteService);
  private auth = inject(AuthService);

  @Input() carro!: Carro;

  form: Partial<CriarVendaPayload> = {
    idCliente: undefined,
    idFuncionario: undefined,
    precoVendaVeiculo: undefined,
    formaPagamento: 'Cartão em 12x',
  };

  clientes: Array<{ id: number; nome: string; cpf: string }> = [];

  ngOnInit(): void {
    // Carrega clientes para o dropdown
    this.clienteService.getClientes().subscribe((list: any[]) => {
      this.clientes = (list || []).map((c: any) => ({
        id: c.id || c.idCliente || c.pessoa?.idPessoa || 0,
        nome: c.pessoa?.nome || c.nome || 'Cliente',
        cpf: c.pessoa?.cpf || c.cpf || ''
      })).filter(c => c.id > 0);
    });

    // Preenche idFuncionario a partir do login (mock)
    const idFunc = this.auth.getFuncionarioId();
    if (idFunc) this.form.idFuncionario = idFunc;
  }

  confirmarVenda() {
    if (!this.carro) return;
    const payload: CriarVendaPayload = {
      idCliente: Number(this.form.idCliente) || 0,
      idFuncionario: Number(this.form.idFuncionario) || 0,
      numChassiVeiculo: this.carro.numChassi,
      precoVendaVeiculo: Number(this.form.precoVendaVeiculo) || 0,
      formaPagamento: (this.form.formaPagamento || '').trim() || undefined,
    };

    // validações rápidas antes do POST
    if (payload.idCliente <= 0) { alert('Informe um ID de Cliente válido.'); return; }
    if (payload.idFuncionario <= 0) { alert('Informe um ID de Funcionário válido.'); return; }
    if (!payload.numChassiVeiculo) { alert('Chassi do veículo inválido.'); return; }
    if (payload.precoVendaVeiculo <= 0) { alert('Informe um preço de venda válido.'); return; }

    this.vendaService.criarVenda(payload).subscribe({
      next: (res) => {
        alert(`Venda criada (ID ${res.idVenda}). Veículo marcado como vendido.`);
        this.activeModal.close(res);
      },
      error: (err) => {
        const msg = typeof err?.error === 'string' ? err.error : (err?.error?.message || err?.message || 'erro desconhecido');
        alert('Falha ao criar venda: ' + msg);
      }
    });
  }
}
