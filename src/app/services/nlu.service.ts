import { Injectable } from '@angular/core';

export type NluIntent =
  | 'listar_carros_disponiveis'
  | 'listar_veiculos_disponiveis'
  | 'detalhes_carro'
  | 'listar_clientes'
  | 'detalhes_cliente'
  | 'consultar_cliente_por_id'
  | 'iniciar_venda'
  | 'criar_venda'
  | 'consultar_venda_por_id'
  | 'listar_vendas'
  | 'consultar_funcionarios'
  | 'ajuda'
  | 'desconhecido';

export interface NluResult {
  intent: NluIntent;
  entities: Record<string, any>;
  confidence?: number;
}

@Injectable({ providedIn: 'root' })
export class NluService {
  // Regras simples para PT-BR; pode ser substituído por um LLM/Azure OpenAI depois
  interpret(texto: string): NluResult {
    const t = (texto || '').toLowerCase().trim();

    if (!t) return { intent: 'desconhecido', entities: {} };

    // Ajuda
    if (/ajuda|help|o que voce faz|como usar/.test(t)) {
      return { intent: 'ajuda', entities: {} };
    }

    // Listar veículos/carros disponíveis
    if (/carro|carros|veiculo|veículos/.test(t) && /(disponivel|disponíveis|estoque|mostrar|listar|ver)/.test(t) && !/cliente|vender|venda/.test(t)) {
      // opcional: extrair marca/modelo
      const modelo = this._extrairEntre(t, 'modelo', ' ');
      const marca = this._extrairEntre(t, 'marca', ' ');
      // aceite ambos os nomes de intent
      return { intent: t.includes('veículo') || t.includes('veiculos') ? 'listar_veiculos_disponiveis' : 'listar_carros_disponiveis', entities: { modelo, marca } };
    }

    // Detalhes do carro por chassi
    if (/(dados|detalhes|informacoes|informações).*carro/.test(t) || /carro.*(dados|detalhes)/.test(t)) {
      const chassi = this._extrairChassi(t);
      const modelo = this._extrairDepoisDe(t, /modelo\s+/);
      return { intent: 'detalhes_carro', entities: { chassi, modelo } };
    }

    // Listar clientes
    if (/cliente|clientes/.test(t) && /(listar|mostrar|ver)/.test(t) && !/vender|venda/.test(t)) {
      return { intent: 'listar_clientes', entities: {} };
    }

    // Detalhes cliente por ID
    if (/(dados|detalhes).*cliente/.test(t) || /cliente.*(dados|detalhes)/.test(t) || /cliente\s*\d+/.test(t)) {
      const idCliente = this._extrairNumeroDepoisDe(t, /cliente\s*/);
      const nome = this._extrairDepoisDe(t, /cliente\s+/);
      return { intent: idCliente ? 'consultar_cliente_por_id' : 'detalhes_cliente', entities: { idCliente, nome } };
    }

    // Iniciar venda
    if (/vender|venda/.test(t)) {
      const chassi = this._extrairChassi(t);
      const idCliente = this._extrairNumeroDepoisDe(t, /(cliente|para o cliente|para cliente)\s*/);
      const idFuncionario = this._extrairNumeroDepoisDe(t, /(funcionario|funcionário|vendedor)\s*/);
      const precoVendaVeiculo = this._extrairNumeroDepoisDe(t, /(por|preco|preço)\s*/);
      return { intent: (chassi && idCliente) ? 'criar_venda' : 'iniciar_venda', entities: { numChassiVeiculo: chassi, idCliente, idFuncionario, precoVendaVeiculo } };
    }

    // Consultar venda por id
    if (/venda\s*\d+/.test(t) || /(ver|consultar|detalhes).*venda/.test(t)) {
      const idVenda = this._extrairNumeroDepoisDe(t, /venda\s*/);
      if (idVenda) return { intent: 'consultar_venda_por_id', entities: { idVenda } };
    }

    // Listar vendas
    if (/vendas/.test(t) && /(listar|mostrar|ver)/.test(t)) {
      return { intent: 'listar_vendas', entities: {} };
    }

    // Consultar funcionarios
    if (/(funcionarios|funcionários)/.test(t) && /(listar|mostrar|ver)/.test(t)) {
      return { intent: 'consultar_funcionarios', entities: {} };
    }

    return { intent: 'desconhecido', entities: {} };
  }

  private _extrairChassi(t: string): string | undefined {
    // Heurística: 10-20 caracteres alfanuméricos após palavras-chave chassi/numéro de chassi
    const m = t.match(/chassi\s*([a-z0-9]{10,20})/i) || t.match(/numero\s*do\s*chassi\s*([a-z0-9]{10,20})/i);
    return m?.[1]?.toUpperCase();
  }

  private _extrairNumeroDepoisDe(t: string, regex: RegExp): number | undefined {
    const r = new RegExp(regex.source + '(\d+)', 'i');
    const m = t.match(r);
    return m?.[1] ? Number(m[1]) : undefined;
  }

  private _extrairDepoisDe(t: string, regex: RegExp): string | undefined {
    const idx = t.search(regex);
    if (idx < 0) return undefined;
    const sub = t.slice(idx).replace(regex, '').trim();
    return sub ? sub.split(/[\.,;!\n]/)[0].trim() : undefined;
  }

  private _extrairEntre(t: string, palavra: string, terminador: string): string | undefined {
    const m = t.match(new RegExp(`${palavra}\\s*([a-z0-9\- ]+)${terminador}?`, 'i'));
    return m?.[1]?.trim();
  }
}
