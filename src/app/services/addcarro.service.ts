import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Carro } from '../models/carro';
import { Cliente } from '../models/cliente';
import { VeiculoCliente } from '../models/veiculocliente';
import { CarroService } from './carro.service';
import { GerenteService } from './gerente.service';

@Injectable({
  providedIn: 'root'
})
export class AddCarroService {

  constructor(
    private carroService: CarroService,
    private gerenteService: GerenteService
  ) { }

  getCarrosDisponiveis(): Observable<Carro[]> {
    let todosOsCarros: Carro[] = [];
    let todosOsClientes: Cliente[] = [];

    this.carroService.getAll().subscribe(carros => todosOsCarros = carros);
    this.gerenteService.getClientesCompletos().subscribe(clientes => todosOsClientes = clientes);

    const carrosDosClientesIds = todosOsClientes.flatMap(cliente => cliente.veiculos.map(v => v.id));

    const carrosDisponiveis = todosOsCarros.filter(carro => !carrosDosClientesIds.includes(carro.id));

    return of(carrosDisponiveis);
  }

  associarCarroAoCliente(clienteId: number, carro: Carro): Observable<any> {
    this.gerenteService.getClientesCompletos().subscribe(clientes => {
        const cliente = clientes.find(c => c.id === clienteId);
        if (cliente) {
            const novoVeiculo: VeiculoCliente = {
                ...carro,
                dataCompra: new Date(),
                quilometragemAtual: carro.kms,
                revisoes: []
            };
            cliente.veiculos.push(novoVeiculo);
            console.log(`Carro ${carro.modelo} associado ao cliente ${cliente.nome}`);
        }
    });
    return of({ success: true });
  }

  desassociarCarroDoCliente(clienteId: number, veiculoId: number): Observable<any> {
    this.gerenteService.getClientesCompletos().subscribe(clientes => {
        const cliente = clientes.find(c => c.id === clienteId);
        if (cliente && cliente.veiculos) {
            const veiculoIndex = cliente.veiculos.findIndex(v => v.id === veiculoId);
            if (veiculoIndex > -1) {
                const veiculoRemovido = cliente.veiculos.splice(veiculoIndex, 1);
                console.log(`Veículo ${veiculoRemovido[0].modelo} removido do cliente ${cliente.nome}`);
            }
        }
    });
    return of({ success: true });
  }
}