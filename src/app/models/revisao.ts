import { Peca } from "./peca";
import { Servico } from "./servico";

export class Revisao {
    id!: number;
    data!: Date;
    quilometragem!: number;
    servicosRealizados!: Servico[]; // Alterado para uma lista de objetos Servico
    pecasTrocadas!: Peca[];      // Alterado para uma lista de objetos Peca
    mecanicoResponsavel!: string;
    custoTotal!: number;
}