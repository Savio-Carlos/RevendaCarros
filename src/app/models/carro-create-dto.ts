import { Carro } from './carro';

// DTO para criação, compatível com o JSON do backend
export interface CarroCreateDTO extends Carro {
  idtipoCombustivel: number;
  idGarantia: number;
  idCliente: number;
}
