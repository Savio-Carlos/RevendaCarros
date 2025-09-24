import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NluService } from '../../../services/nlu.service';
import { NluProxyService } from '../../../services/nlu-proxy.service';
import { USE_REMOTE_NLU } from '../../../services/ai-provider.config';
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
    private nlu: NluService,
    private nluProxy: NluProxyService,
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

    // Save user message in local history
    this._pushMsg('user', entrada);

  const handle = (intent: string, entities: any) => {
      switch (intent) {
        case 'ajuda':
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

    if (USE_REMOTE_NLU) {
      this.nluProxy.interpret(entrada).subscribe({
        next: (res) => {
          // Sempre calculamos a interpretação local para comparativo
          const nLocal = this.nlu.interpret(entrada);
          const isRemoteUnknown = !res?.intent || res.intent === 'desconhecido' || res.intent === 'fallback' || !this.KNOWN_INTENTS.has(res.intent);
          // Heurística: se o usuário falou em vender/venda e o local entendeu como 'criar_venda', preferir o local
          const textoLower = entrada.toLowerCase();
          const isSaleUtterance = /\bvender\b|\bvenda\b/.test(textoLower);
          const preferLocal = isRemoteUnknown || (isSaleUtterance && nLocal.intent === 'criar_venda' && res.intent !== 'criar_venda');

          if (preferLocal && nLocal.intent !== 'desconhecido') {
            if (isRemoteUnknown) this._pushMsg('bot', 'Interpretei localmente para te ajudar.');
            this.pensando = false;
            handle(nLocal.intent, nLocal.entities);
            return;
          }

          this.pensando = false;
          handle(res.intent, res.entities);
        },
        error: (err) => {
          // Fallback para NLU local se backend estiver indisponível
          console.error('[NLU remoto] falhou, usando NLU local.', err);
          const n = this.nlu.interpret(entrada);
          this.pensando = false;
          handle(n.intent, n.entities);
          this._pushMsg('bot', 'NLU remoto indisponível, usei interpretação local.');
        }
      });
    } else {
      const n = this.nlu.interpret(entrada);
      this.pensando = false;
      handle(n.intent, n.entities);
    }
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
    this.resposta = 'Não entendi. Tente: "listar carros disponíveis" ou "detalhes do carro chassi XYZ"';
  this._pushMsg('bot', this.resposta);
  }

  private _listarCarros({ marca, modelo }: any) {
    this.carros.getCarros().subscribe({
      next: (lista: Carro[]) => {
        let disponiveis = (lista || []).filter(c => c.idStatusVeiculo === 1);
        if (marca) disponiveis = disponiveis.filter(c => c.marcaCarro.toLowerCase().includes(String(marca).toLowerCase()));
        if (modelo) disponiveis = disponiveis.filter(c => c.modeloVeiculo.toLowerCase().includes(String(modelo).toLowerCase()));
        if (!disponiveis.length) {
          this.resposta = 'Não encontrei carros disponíveis com esses critérios.';
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
        this.resposta = 'Erro ao consultar carros.';
        this.pensando = false;
  this._pushMsg('bot', this.resposta);
      }
    });
  }

  private _detalhesCarro({ chassi, modelo }: any) {
    if (!chassi) {
      this.pensando = false;
      this.resposta = 'Informe o chassi do carro para ver detalhes.';
      return;
    }
    this.carros.getCarroByChassi(chassi).subscribe({
      next: c => {
        if (!c) { this.resposta = 'Carro não encontrado.'; this.pensando = false; return; }
        this.resposta = `O carro solicitado é o ${c.marcaCarro} ${c.modeloVeiculo}, ano ${c.anoModelo}, preço R$ ${c.precoVeiculo.toLocaleString('pt-BR')}.`;
        this.pensando = false;
        this._pushMsg('bot', this._stripHtml(this.resposta));
      },
      error: () => { this.resposta = 'Erro ao buscar detalhes do carro.'; this.pensando = false; this._pushMsg('bot', this.resposta); }
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
      error: () => { this.resposta = 'Erro ao consultar clientes.'; this.pensando = false; this._pushMsg('bot', this.resposta); }
    });
  }

  private _detalhesCliente({ idCliente, nome }: any) {
    if (!idCliente) {
      this.pensando = false;
      this.resposta = 'Informe o ID do cliente.';
      return;
    }
    // Não há endpoint de detalhes isolado no frontend; reusa getClientes e filtra
    this.clientes.getClientes().subscribe({
      next: (lista: any[]) => {
        const c = (lista || []).find(x => (x.id || x.idCliente || x.pessoa?.idPessoa) == idCliente);
        if (!c) this.resposta = 'Cliente não encontrado.';
        else this.resposta = `Cliente ${c.pessoa?.nome || c.nome} (ID ${idCliente}).`;
        this.pensando = false;
        this._pushMsg('bot', this._stripHtml(this.resposta));
      },
      error: () => { this.resposta = 'Erro ao buscar cliente.'; this.pensando = false; this._pushMsg('bot', this.resposta); }
    });
  }

  private _iniciarVenda(entities: any) {
    // Normaliza aliases de entidades vindas do NLU (remoto ou local)
    const chassi = (entities?.numChassiVeiculo || entities?.chassi || entities?.numeroChassi || entities?.numChassi || entities?.vin || '').toString().toUpperCase();
    const idCliente = Number(entities?.idCliente ?? entities?.cliente ?? entities?.idPessoaCliente);
    const idFuncionario = Number(entities?.idFuncionario ?? entities?.funcionario ?? entities?.vendedor);
    const precoInformado = Number(entities?.precoVendaVeiculo ?? entities?.preco ?? entities?.preço ?? entities?.valor);

    if (!chassi || !idCliente) {
      this.pensando = false;
      this.resposta = 'Para iniciar uma venda, informe chassi e ID do cliente.';
      return;
    }
    // Busca preço do carro e executa venda usando serviços existentes
    this.carros.getCarroByChassi(chassi).subscribe({
      next: carro => {
        if (!carro) { this.resposta = 'Carro não encontrado.'; this.pensando = false; return; }
        const payload = {
          idCliente: Number(idCliente),
          idFuncionario: Number(idFuncionario) || undefined,
          numChassiVeiculo: carro.numChassi,
          precoVendaVeiculo: Number.isFinite(precoInformado) && precoInformado > 0 ? precoInformado : carro.precoVeiculo,
          formaPagamento: 'À vista'
        } as any;
        if (!payload.idFuncionario) {
          // tenta escolher primeiro vendedor válido automaticamente
          this.funcionarios.getFuncionarios().subscribe({
            next: funcs => {
              const f = (funcs || [])[0];
              if (!f) { this.resposta = 'Nenhum vendedor disponível para a venda.'; this.pensando = false; return; }
              payload.idFuncionario = f.idFuncionario;
              this._postVenda(payload);
            },
            error: () => { this.resposta = 'Erro ao obter vendedor.'; this.pensando = false; }
          });
        } else {
          this._postVenda(payload);
        }
      },
      error: () => { this.resposta = 'Erro ao consultar carro para venda.'; this.pensando = false; }
    });
  }

  private _postVenda(payload: any) {
    this.vendas.criarVenda(payload).subscribe({
      next: (res: any) => {
        this.resposta = `Venda criada (ID ${res.idVenda}). Veículo marcado como vendido.`;
        this.pensando = false;
        this._pushMsg('bot', this._stripHtml(this.resposta));
      },
      error: (err) => {
        const msg = typeof err?.error === 'string' ? err.error : (err?.error?.message || err?.message || 'erro desconhecido');
        this.resposta = 'Falha ao concluir venda: ' + msg;
        this.pensando = false;
        this._pushMsg('bot', this.resposta);
      }
    });
  }

  private _consultarVendaPorId({ idVenda }: any) {
    const id = Number(idVenda);
    if (!Number.isFinite(id) || id <= 0) { this.pensando = false; this.resposta = 'Informe um ID de venda válido.'; this._pushMsg('bot', this.resposta); return; }
    this.vendas.getVendaById(id).subscribe({
      next: (v: any) => {
        if (!v) { this.resposta = 'Venda não encontrada.'; }
        else {
          this.resposta = `Venda ${v.idVenda} em ${v.dataVenda}, chassi ${v.numChassiVeiculo}, cliente ${v.idCliente}, vendedor ${v.idFuncionario}, valor R$ ${Number(v.precoVendaVeiculo).toLocaleString('pt-BR')}.`;
        }
        this.pensando = false; this._pushMsg('bot', this._stripHtml(this.resposta));
      },
      error: () => { this.resposta = 'Erro ao consultar venda.'; this.pensando = false; this._pushMsg('bot', this.resposta); }
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
      error: () => { this.resposta = 'Erro ao listar vendas.'; this.pensando = false; this._pushMsg('bot', this.resposta); }
    });
  }

  private _listarFuncionarios() {
    this.funcionarios.getFuncionarios().subscribe({
      next: (fs) => {
        if (!fs || !fs.length) this.resposta = 'Nenhum funcionário encontrado.';
        else this.resposta = 'Funcionários:<br/>' + fs.map(f => `${f.idFuncionario} — ${f.nome}`).join('<br/>');
        this.pensando = false; this._pushMsg('bot', this.resposta);
      },
      error: () => { this.resposta = 'Erro ao consultar funcionários.'; this.pensando = false; this._pushMsg('bot', this.resposta); }
    });
  }

  // Histórico simples em localStorage
  private _pushMsg(author: 'user'|'bot', text: string) {
    const entry = { author, text, time: new Date().toISOString() };
    const key = 'assistente_chat';
    const hist = JSON.parse(localStorage.getItem(key) || '[]');
    hist.push(entry);
    localStorage.setItem(key, JSON.stringify(hist));
  }
  private _stripHtml(html: string) { return html.replace(/<[^>]+>/g, ''); }
}
