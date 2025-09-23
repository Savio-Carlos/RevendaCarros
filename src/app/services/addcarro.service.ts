import { Injectable } from '@angular/core';
import { Observable, of, combineLatest, map } from 'rxjs';
import { Carro } from '../models/carro';
import { Cliente } from '../models/cliente';
import { VeiculoCliente } from '../models/veiculocliente';
import { CarroService } from './carro.service';
import { GerenteService } from './gerente.service';
import { ClienteService } from './cliente.service';

@Injectable({
  providedIn: 'root'
})
export class AddCarroService {

  constructor(
    private carroService: CarroService,
  private gerenteService: GerenteService,
  private clienteService: ClienteService
  ) { }

  getCarrosDisponiveis(): Observable<Carro[]> {
    return combineLatest([
      this.carroService.getCarros(),
      this.clienteService.getClientes()
    ]).pipe(
      map(([carros, clientes]: [Carro[], any[]]) => {
        const chassisDosClientes = (clientes || [])
          .flatMap((cliente: any) => (cliente.veiculos || cliente.carros || [])
            .map((v: any) => v.numChassi ?? v.chassi))
          .filter(Boolean);
        return (carros || []).filter(c => !chassisDosClientes.includes(c.numChassi));
      })
    );
  }

  associarCarroAoCliente(clienteId: number, carro: Carro): Observable<any> {
  this.gerenteService.getClientesCompletos().subscribe(clientes => {
        const cliente = clientes.find(c => c.id === clienteId);
        if (cliente) {
            const novoVeiculo: VeiculoCliente = Object.assign(new VeiculoCliente(), {
                // Campos do modelo atual (Carro)
                numChassi: carro.numChassi,
                placa: carro.placa,
                marcaCarro: carro.marcaCarro,
                modeloVeiculo: carro.modeloVeiculo,
                anoModelo: carro.anoModelo,
                quilometragem: carro.quilometragem,
                cor: carro.cor,
                precoVeiculo: carro.precoVeiculo,
                descricao: carro.descricao,
                fotos: carro.fotos,
                idStatusVeiculo: carro.idStatusVeiculo,
                // Campos específicos do veículo do cliente
                dataCompra: new Date(),
                quilometragemAtual: carro.quilometragem,
                revisoes: []
            });
            cliente.veiculos.push(novoVeiculo);
            console.log(`Carro ${carro.modeloVeiculo} associado ao cliente ${cliente.nome}`);
        }
    });
    return of({ success: true });
  }

  desassociarCarroDoCliente(clienteId: number, veiculoChassi: string): Observable<any> {
  this.gerenteService.getClientesCompletos().subscribe(clientes => {
        const cliente = clientes.find(c => c.id === clienteId);
        if (cliente && cliente.veiculos) {
            const veiculoIndex = cliente.veiculos.findIndex(v => v.numChassi === veiculoChassi);
            if (veiculoIndex > -1) {
                const veiculoRemovido = cliente.veiculos.splice(veiculoIndex, 1);
                console.log(`Veículo ${veiculoRemovido[0].modeloVeiculo} removido do cliente ${cliente.nome}`);
            }
        }
    });
    return of({ success: true });
  }
}