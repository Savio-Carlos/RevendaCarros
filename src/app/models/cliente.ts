export interface Cliente {
}
import { Compra } from "./compra";
import { VeiculoCliente } from "./veiculocliente";

export interface Cliente {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    contato: string;
    endereco: {
        cep: string;
        logradouro: string;
        numero: string;
        complemento?: string;
        bairro: string;
        localidade: string;
        uf: string;
    };
    veiculos: VeiculoCliente[];
    comprasPecas: Compra[];
}