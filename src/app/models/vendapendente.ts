import { Carro } from "./carro";
import { Cliente } from "./cliente";

export interface VendaPendente {
    id: number;
    cliente: Cliente;
    carro: Carro;
    dataInicio: Date;
    status: 'Aguardando Pagamento' | 'Documentação' | 'Preparando Entrega' | 'Concluido';
}