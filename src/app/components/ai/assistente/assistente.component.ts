import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AzureProxyService } from '../../../services/azure-proxy.service';
import { USE_REMOTE_AZURE } from '../../../services/ai-provider.config';
import { CarroService } from '../../../services/carro.service';
import { ClienteService } from '../../../services/cliente.service';
import { VendaService } from '../../../services/venda.service';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Carro } from '../../../models/carro';

@Component({
  selector: 'app-assistente-ia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container py-4">
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">Oi, eu sou a IA do grupo. O que deseja?</h5>
        <div class="input-group mb-3">
          <input [(ngModel)]="texto" class="form-control" placeholder="Ex.: Quero ver os carros disponíveis da marca Fiat" (keyup.enter)="processar()" />
          <button class="btn btn-dark" (click)="processar()">Enviar</button>
        </div>
        <div *ngIf="pensando" class="text-muted small">Interpretando seu pedido…</div>
        <div *ngIf="resposta" class="mt-3">
          <div [innerHTML]="resposta"></div>
        </div>
      </div>
    </div>
  </div>
  `
})
export class AssistenteComponent {
  texto = '';
  resposta = '';
  pensando = false;
  private readonly KNOWN_INTENTS = new Set([
    'ajuda',
  'help',
    'listar_carros_disponiveis',
    'listar_veiculos_disponiveis',
    'listar_carros',
    'listar_veiculos',
    'detalhes_carro',
    'listar_clientes',
    'detalhes_cliente',
    'consultar_cliente_por_id',
    'iniciar_venda',
    'criar_venda',
    'consultar_venda_por_id',
    'listar_vendas',
    'consultar_funcionarios'
  ]);

  constructor(
    private nluProxy: AzureProxyService,
    private carros: CarroService,
    private clientes: ClienteService,
    private vendas: VendaService,
    private funcionarios: FuncionarioService,
  ) {}

  processar() {
    const entrada = (this.texto || '').trim();
    if (!entrada) return;
    this.pensando = true;
    this.resposta = '';

  this._pushMsg('user', entrada);

  const handle = (intent: string, entities: any) => {
      // Normalização de intents retornadas pela Azure
      if (intent === 'help') intent = 'ajuda';
      if (intent === 'list_cars_by_brand' || intent === 'list_cars' || intent === 'list_vehicles') {
        intent = 'listar_carros_disponiveis';
      }
      if (intent === 'ver_detalhes_chassi' || intent === 'car_details' || intent === 'vehicle_details') {
        intent = 'detalhes_carro';
      }
      if (intent === 'get_customer_details' || intent === 'customer_details' || intent === 'customer_info') {
        intent = 'consultar_cliente_por_id';
      }
      // Normalização de entidades
      if (entities) {
        if (entities.brand && !entities.marca) entities.marca = entities.brand;
        if (entities.model && !entities.modelo) entities.modelo = entities.model;
        if (entities.vin && !entities.chassi && !entities.numChassiVeiculo) entities.chassi = entities.vin;
        if ((entities.customer_id || entities.customerId) && !entities.idCliente) {
          entities.idCliente = entities.customer_id || entities.customerId;
        }
      }
      switch (intent) {
        case 'ajuda':
        case 'help':
          this._renderAjuda();
          break;
    case 'listar_carros_disponiveis':
    case 'listar_veiculos_disponiveis':
    case 'listar_carros':
    case 'listar_veiculos':
          this._listarCarros(entities);
          break;
        case 'detalhes_carro':
          this._detalhesCarro(entities);
          break;
        case 'listar_clientes':
          this._listarClientes();
          break;
        case 'detalhes_cliente':
        case 'consultar_cliente_por_id':
          this._detalhesCliente(entities);
          break;
        case 'iniciar_venda':
        case 'criar_venda':
          this._iniciarVenda(entities);
          break;
        case 'consultar_venda_por_id':
          this._consultarVendaPorId(entities);
          break;
        case 'listar_vendas':
          this._listarVendas();
          break;
        case 'consultar_funcionarios':
          this._listarFuncionarios();
          break;
        default:
          this._renderDesconhecido();
          break;
      }
    };

    this.nluProxy.interpret(entrada).subscribe({
      next: (res) => {
        this.pensando = false;
        handle(res.intent, res.entities);
      },
      error: (err) => {
        const msg = typeof err?.error === 'string' ? err.error : (err?.error?.message || err?.message || '');
        this.resposta = msg;
        this.pensando = false;
        this._pushMsg('bot', this.resposta);
      }
    });
  }

  private _renderAjuda() {
    this.pensando = false;
    this.resposta = `Posso: <ul>
      <li>Listar carros disponíveis (ex.: "quero ver os carros disponíveis")</li>
      <li>Mostrar detalhes de um carro por chassi (ex.: "detalhes do carro chassi ABC123...")</li>
      <li>Listar clientes</li>
      <li>Consultar/gerar vendas e iniciar uma venda informando chassi, cliente e vendedor</li>
    </ul>`;
    this._pushMsg('bot', this._stripHtml(this.resposta));
  }

  private _renderDesconhecido() {
    this.pensando = false;
  this.resposta = '';
  }

  private _listarCarros({ marca, modelo }: any) {
    this.carros.getCarros().subscribe({
      next: (lista: Carro[]) => {
        let disponiveis = (lista || []).filter(c => c.idStatusVeiculo === 1);
        if (marca) disponiveis = disponiveis.filter(c => c.marcaCarro.toLowerCase().includes(String(marca).toLowerCase()));
        if (modelo) disponiveis = disponiveis.filter(c => c.modeloVeiculo.toLowerCase().includes(String(modelo).toLowerCase()));
        if (!disponiveis.length) {
          this.resposta = 'Nenhum carro disponível para os critérios informados.';
        } else {
          const html = disponiveis.slice(0, 5).map(c => `
            <div><strong>${c.marcaCarro} ${c.modeloVeiculo}</strong> — Ano ${c.anoModelo}, R$ ${c.precoVeiculo.toLocaleString('pt-BR')}</div>
          `).join('');
          this.resposta = `Encontrei ${disponiveis.length} carro(s):<br/>${html}`;
        }
        this.pensando = false;
  this._pushMsg('bot', this._stripHtml(this.resposta));
      },
      error: err => {
        const msg = typeof err?.error === 'string' ? err.error : (err?.error?.message || err?.message || '');
        this.resposta = msg;
        this.pensando = false;
  this._pushMsg('bot', this.resposta);
      }
    });
  }

  private _detalhesCarro({ chassi, modelo }: any) {
    if (!chassi) { this.pensando = false; return; }
    this.carros.getCarroByChassi(chassi).subscribe({
      next: c => {
        if (!c) { this.resposta = ''; this.pensando = false; return; }
        this.resposta = `O carro solicitado é o ${c.marcaCarro} ${c.modeloVeiculo}, ano ${c.anoModelo}, preço R$ ${c.precoVeiculo.toLocaleString('pt-BR')}.`;
        this.pensando = false;
        this._pushMsg('bot', this._stripHtml(this.resposta));
      },
      error: (err) => { const msg = typeof err?.error === 'string' ? err.error : (err?.error?.message || err?.message || ''); this.resposta = msg; this.pensando = false; this._pushMsg('bot', this.resposta); }
    });
  }

  private _listarClientes() {
    this.clientes.getClientes().subscribe({
      next: (lista: any[]) => {
        const clientes = (lista || []).map(c => ({ id: c.id || c.idCliente || c.pessoa?.idPessoa, nome: c.pessoa?.nome || c.nome })).filter(x => x.id && x.nome);
        if (!clientes.length) this.resposta = 'Nenhum cliente encontrado.';
        else this.resposta = 'Clientes:<br/>' + clientes.slice(0, 10).map(c => `${c.id} — ${c.nome}`).join('<br/>' );
        this.pensando = false;
        this._pushMsg('bot', this._stripHtml(this.resposta));
      },
      error: (err) => { const msg = typeof err?.error === 'string' ? err.error : (err?.error?.message || err?.message || ''); this.resposta = msg; this.pensando = false; this._pushMsg('bot', this.resposta); }
    });
  }

  private _detalhesCliente({ idCliente, nome }: any) {
    this.clientes.getClientes().subscribe({
      next: (lista: any[]) => {
        const c = (lista || []).find(x => (x.id || x.idCliente || x.pessoa?.idPessoa) == idCliente);
        if (!c) this.resposta = '';
        else this.resposta = `Cliente ${c.pessoa?.nome || c.nome} (ID ${idCliente}).`;
        this.pensando = false;
        this._pushMsg('bot', this._stripHtml(this.resposta));
      },
      error: (err) => { const msg = typeof err?.error === 'string' ? err.error : (err?.error?.message || err?.message || ''); this.resposta = msg; this.pensando = false; this._pushMsg('bot', this.resposta); }
    });
  }

  private _iniciarVenda(entities: any) {
    const chassi = (entities?.numChassiVeiculo || entities?.chassi || entities?.numeroChassi || entities?.numChassi || entities?.vin || '').toString().toUpperCase();
    const idCliente = Number(entities?.idCliente ?? entities?.cliente ?? entities?.idPessoaCliente);
    const idFuncionario = Number(entities?.idFuncionario ?? entities?.funcionario ?? entities?.vendedor);
    const precoInformado = Number(entities?.precoVendaVeiculo ?? entities?.preco ?? entities?.preço ?? entities?.valor);

    if (!chassi || !idCliente) {
      this.pensando = false;
      this.resposta = 'Para iniciar uma venda, informe chassi e ID do cliente.';
      return;
    }
    this.carros.getCarroByChassi(chassi).subscribe({
      next: carro => {
        if (!carro) {  }
        const payload = {
          idCliente: Number(idCliente),
          idFuncionario: Number(idFuncionario) || undefined,
          numChassiVeiculo: (carro?.numChassi || chassi),
          precoVendaVeiculo: Number.isFinite(precoInformado) && precoInformado > 0 ? precoInformado : (carro?.precoVeiculo || 0),
          formaPagamento: 'À vista'
        } as any;
        if (!payload.idFuncionario) {
          // tenta escolher primeiro vendedor válido automaticamente; se falhar, envia assim para backend validar
          this.funcionarios.getFuncionarios().subscribe({
            next: funcs => {
              const f = (funcs || [])[0];
              if (f) payload.idFuncionario = f.idFuncionario;
              this._postVenda(payload);
            },
            error: () => { this._postVenda(payload); }
          });
        } else { this._postVenda(payload); }
      },
      error: () => { this._postVenda({ idCliente, idFuncionario, numChassiVeiculo: chassi, precoVendaVeiculo: Number.isFinite(precoInformado) ? precoInformado : 0, formaPagamento: 'À vista' }); }
    });
  }

  private _postVenda(payload: any) {
    this.vendas.criarVenda(payload).subscribe({
      next: (res: any) => {
        this.resposta = `Venda criada (ID ${res.idVenda}).`;
        this.pensando = false;
        this._pushMsg('bot', this._stripHtml(this.resposta));
      },
      error: (err) => {
        const msg = typeof err?.error === 'string' ? err.error : (err?.error?.message || err?.message || '');
        this.resposta = msg;
        this.pensando = false;
        this._pushMsg('bot', this.resposta);
      }
    });
  }

  private _consultarVendaPorId({ idVenda }: any) {
    const id = Number(idVenda);
    const efetivo = Number.isFinite(id) && id > 0 ? id : 0;
    this.vendas.getVendaById(efetivo).subscribe({
      next: (v: any) => {
        if (!v) { this.resposta = ''; }
        else {
          this.resposta = `Venda ${v.idVenda} em ${v.dataVenda}, chassi ${v.numChassiVeiculo}, cliente ${v.idCliente}, vendedor ${v.idFuncionario}, valor R$ ${Number(v.precoVendaVeiculo).toLocaleString('pt-BR')}.`;
        }
        this.pensando = false; this._pushMsg('bot', this._stripHtml(this.resposta));
      },
      error: (err) => { const msg = typeof err?.error === 'string' ? err.error : (err?.error?.message || err?.message || ''); this.resposta = msg; this.pensando = false; this._pushMsg('bot', this.resposta); }
    });
  }

  private _listarVendas() {
    this.vendas.getVendas().subscribe({
      next: (vs) => {
        if (!vs || !vs.length) this.resposta = 'Nenhuma venda encontrada.';
        else {
          const linhas = vs.slice(0, 10).map(v => {
            const label = v.tipo === 'Carro' ? ((v.itemVendido as any)?.modeloVeiculo || '') : ((v.itemVendido as any)?.nome || v.tipo);
            return `${v.id} — ${label} — R$ ${v.valorFinal?.toLocaleString('pt-BR')}`;
          }).join('<br/>' );
          this.resposta = 'Vendas recentes:<br/>' + linhas;
        }
        this.pensando = false; this._pushMsg('bot', this._stripHtml(this.resposta));
      },
  error: (err) => { const msg = typeof err?.error === 'string' ? err.error : (err?.error?.message || err?.message || ''); this.resposta = msg; this.pensando = false; this._pushMsg('bot', this.resposta); }
    });
  }

  private _listarFuncionarios() {
    this.funcionarios.getFuncionarios().subscribe({
      next: (fs) => {
        if (!fs || !fs.length) this.resposta = 'Nenhum funcionário encontrado.';
        else this.resposta = 'Funcionários:<br/>' + fs.map(f => `${f.idFuncionario} — ${f.nome}`).join('<br/>');
        this.pensando = false; this._pushMsg('bot', this.resposta);
      },
  error: (err) => { const msg = typeof err?.error === 'string' ? err.error : (err?.error?.message || err?.message || ''); this.resposta = msg; this.pensando = false; this._pushMsg('bot', this.resposta); }
    });
  }

  private _pushMsg(author: 'user'|'bot', text: string) {
    const entry = { author, text, time: new Date().toISOString() };
    const key = 'assistente_chat';
    const hist = JSON.parse(localStorage.getItem(key) || '[]');
    hist.push(entry);
    localStorage.setItem(key, JSON.stringify(hist));
  }
  private _stripHtml(html: string) { return html.replace(/<[^>]+>/g, ''); }
}
