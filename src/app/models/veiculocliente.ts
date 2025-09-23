import { Carro } from "./carro";
import { Revisao } from "./revisao";

export class VeiculoCliente implements Carro {
    private _precoVeiculo = 0;

    get precoVeiculo(): number {
        return this._precoVeiculo;
    }

    set precoVeiculo(value: number) {
        this._precoVeiculo = Math.max(0, Number(value) || 0);
    }

    calcularPrecoAtual(): number {
        const base = this._precoVeiculo || 0;
        if (!this.dataCompra) return base;

        const now = new Date();
        const compra = new Date(this.dataCompra);
        let years = now.getFullYear() - compra.getFullYear();
        const monthDiff = now.getMonth() - compra.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < compra.getDate())) years--;
        years = Math.max(0, years);

        // Depreciação anual de 5%
        let price = base * Math.pow(0.95, years);

        // Penalidade por quilometragem: 1% a cada 10.000 km
        const km = this.quilometragemAtual ?? this.quilometragem ?? 0;
        const kmPenalty = Math.floor(km / 10000) * 0.01;
        price *= Math.max(0.5, 1 - kmPenalty); // não reduz abaixo de 50% só por km

        return Math.round(price * 100) / 100;
    }

    atualizarQuilometragem(novaQuilometragem: number): void {
        if (typeof novaQuilometragem !== "number" || novaQuilometragem < 0) return;
        if (!this.quilometragemAtual || novaQuilometragem > this.quilometragemAtual) {
            this.quilometragemAtual = novaQuilometragem;
        }
    }

    adicionarRevisao(revisao: Revisao): void {
        this.revisoes = this.revisoes || [];
        this.revisoes.push(revisao);
    }

    toJSON(): Record<string, unknown> {
        return {
            numChassi: this.numChassi,
            placa: this.placa,
            marcaCarro: this.marcaCarro,
            modeloVeiculo: this.modeloVeiculo,
            anoModelo: this.anoModelo,
            quilometragem: this.quilometragem,
            quilometragemAtual: this.quilometragemAtual,
            cor: this.cor,
            descricao: this.descricao,
            fotos: this.fotos,
            idStatusVeiculo: this.idStatusVeiculo,
            dataCompra: this.dataCompra?.toISOString?.() ?? this.dataCompra,
            precoVeiculo: this._precoVeiculo,
            revisoes: this.revisoes,
        };
    }
    numChassi!: string;
    placa!: string;
    marcaCarro!: string;
    modeloVeiculo!: string;
    anoModelo!: number;
    quilometragem!: number;
    cor!: string;
    descricao!: string;
    fotos!: string;
    idStatusVeiculo!: number;
    dataCompra!: Date;
    quilometragemAtual!: number;
    revisoes!: Revisao[];
}