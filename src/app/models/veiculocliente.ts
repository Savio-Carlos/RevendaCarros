import { Carro } from "./carro";
import { Revisao } from "./revisao";

export class VeiculoCliente extends Carro {
    dataCompra!: Date;
    quilometragemAtual!: number;
    revisoes!: Revisao[];
}