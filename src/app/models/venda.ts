import { Carro } from "./carro";
import { Peca } from "./peca";

export interface Venda {
    id: number;
    dataVenda: Date;
    tipo: 'Carro' | 'Peça';
    itemVendido: Carro | Peca;
    valorFinal: number;
    vendedor: string;
}