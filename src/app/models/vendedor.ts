import { Venda } from "./venda";

export interface Vendedor {
    id: number;
    nome: string;
    metaMensal: number;
    vendas: Venda[];
}