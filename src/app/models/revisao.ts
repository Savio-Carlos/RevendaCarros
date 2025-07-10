import { Peca } from "./peca";
import { Servico } from "./servico";

export class Revisao {
    id!: number;
    data!: Date;
    quilometragem!: number;
    servicosRealizados!: Servico[];
    pecasTrocadas!: Peca[];
    mecanicoResponsavel!: string;
    custoTotal!: number;
    status!: 'Em Aberto' | 'Concluído'; 
    clienteNome!: string;
    veiculoDescricao!: string;
}