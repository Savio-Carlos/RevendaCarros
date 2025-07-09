import { Peca } from "./peca";

export class Compra {
    id!: number;
    dataCompra!: Date;
    itens!: Peca[];
    valorTotal!: number;
}