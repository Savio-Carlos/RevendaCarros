import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Vendedor } from '../models/vendedor';
import { VendaService } from './venda.service';
import { VeiculoCliente } from '../models/veiculocliente';

@Injectable({
  providedIn: 'root'
})
export class GerenteService {

  private MOCK_CLIENTES: Cliente[] = [
    // Cliente 1
    {
      id: 1,
      nome: 'Carlos Eduardo',
      email: 'carlos.edu@example.com',
      cpf: '111.222.333-44',
      contato: '(45) 99999-8888',
      endereco: { cep: '85851-000', logradouro: 'Av. Brasil', numero: '123', bairro: 'Centro', localidade: 'Foz do Iguaçu', uf: 'PR' },
      veiculos: [
        Object.assign(new VeiculoCliente(), {
          numChassi: '9BWZZZ377VT004251',
          placa: 'GHI-9012',
          marcaCarro: 'Jeep',
          modeloVeiculo: 'Compass Longitude',
          anoModelo: 2024,
          quilometragem: 18500,
          cor: 'Cinza',
          precoVeiculo: 140000,
          descricao: '',
          fotos: 'assets/images/compass.webp',
          idStatusVeiculo: 1,
          dataCompra: new Date('2024-01-15'),
          quilometragemAtual: 28300,
          revisoes: [
            { 
              id: 1, 
              data: new Date('2024-07-20'), 
              quilometragem: 10150, 
              servicosRealizados: [{ id: 1, nome: 'Troca de óleo', preco: 250, descricao: '', categoria: 'Manutenção', imagemUrl: '' }], 
              pecasTrocadas: [{ id: 1, nome: 'Filtro de Óleo', preco: 85.50 } as any], 
              mecanicoResponsavel: 'João da Silva', 
              custoTotal: 335.50,
              status: 'Concluído',
              clienteNome: 'Carlos Eduardo',
              veiculoDescricao: 'Compass Longitude (Jeep)'
            },
            { 
              id: 2, 
              data: new Date('2025-02-10'), 
              quilometragem: 20500, 
              servicosRealizados: [{ id: 2, nome: 'Alinhamento', preco: 150, descricao: '', categoria: 'Manutenção', imagemUrl: '' }], 
              pecasTrocadas: [], 
              mecanicoResponsavel: 'Carlos Pereira', 
              custoTotal: 150.00,
              status: 'Concluído',
              clienteNome: 'Carlos Eduardo',
              veiculoDescricao: 'Compass Longitude (Jeep)'
            }
          ]
        })
      ],
      comprasPecas: [
        { id: 1, dataCompra: new Date('2025-05-10'), itens: [{ id: 3, nome: 'Vela de Ignição Iridium', preco: 65.00 } as any], valorTotal: 65.00 }
      ]
    },
    // Cliente 2
    {
      id: 2,
      nome: 'Ana Paula',
      email: 'ana.paula@example.com',
      cpf: '555.666.777-88',
      contato: '(45) 98888-7777',
      endereco: { cep: '85852-000', logradouro: 'Rua das Flores', numero: '456', bairro: 'Jardim das Laranjeiras', localidade: 'Foz do Iguaçu', uf: 'PR' },
      veiculos: [
        Object.assign(new VeiculoCliente(), {
          numChassi: '9BGASD12345XYZ678',
          placa: 'ASI-1231',
          marcaCarro: 'Chevrolet',
          modeloVeiculo: 'Onix Plus Turbo',
          anoModelo: 2023,
          quilometragem: 5000,
          cor: 'Branco',
          precoVeiculo: 96000,
          descricao: '',
          fotos: 'assets/images/onix.webp',
          idStatusVeiculo: 1,
          dataCompra: new Date('2023-11-20'),
          quilometragemAtual: 10500,
          revisoes: [
            { 
              id: 3, 
              data: new Date('2024-09-15'), 
              quilometragem: 10050, 
              servicosRealizados: [{ id: 1, nome: 'Troca de óleo', preco: 220, descricao: '', categoria: 'Manutenção', imagemUrl: '' }], 
              pecasTrocadas: [{ id: 1, nome: 'Filtro de Óleo', preco: 75.00 } as any], 
              mecanicoResponsavel: 'João da Silva', 
              custoTotal: 295.00,
              status: 'Concluído',
              clienteNome: 'Ana Paula',
              veiculoDescricao: 'Onix Plus Turbo (Chevrolet)'
            }
          ]
        })
      ],
      comprasPecas: []
    }
  ];

  constructor(private vendaService: VendaService) {} 

  getClientesCompletos(): Observable<Cliente[]> {
    return of(this.MOCK_CLIENTES);
  }

  getVendedoresComDesempenho(): Observable<Vendedor[]> {
    let todasAsVendas: any[] = [];
    this.vendaService.getVendas().subscribe(v => todasAsVendas = v);

    const vendedores: Vendedor[] = [
      {
        id: 1,
        nome: 'João da Silva',
        metaMensal: 50000,
        vendas: todasAsVendas.filter(v => v.vendedor === 'João da Silva')
      },
      {
        id: 2,
        nome: 'Carlos Pereira',
        metaMensal: 75000,
        vendas: todasAsVendas.filter(v => v.vendedor === 'Carlos Pereira')
      }
    ];
    return of(vendedores);
  }
}
