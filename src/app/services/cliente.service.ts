import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VeiculoCliente } from '../models/veiculocliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // Dados de exemplo para um cliente logado
 private MOCK_VEICULOS_CLIENTE: VeiculoCliente[] = [
    {
      id: 3,
      modelo: 'Compass Longitude',
      marca: 'Jeep',
      ano: 2024,
      preco: 140000,
      kms: 18500,
      combustivel: 'Diesel',
      cambio: 'Automático',
      fotoUrl: 'assets/images/compass.webp',
      dataCompra: new Date('2024-01-15'),
      quilometragemAtual: 28300,
      revisoes: [
        { 
          id: 1, 
          data: new Date('2024-07-20'), 
          quilometragem: 10150, 
          servicosRealizados: [
            { id: 1, nome: 'Troca de óleo e filtro', preco: 250 },
            { id: 2, nome: 'Alinhamento e Balanceamento', preco: 150 }
          ], 
          pecasTrocadas: [
            { id: 1, nome: 'Filtro de Óleo - Motor X', marca: 'Bosch', estoque: 0, preco: 85.50, fotoUrl: 'assets/images/filtrooleo.webp' }
          ],
          mecanicoResponsavel: 'João da Silva',
          custoTotal: 485.50
        },
        { 
          id: 2, 
          data: new Date('2025-02-10'), 
          quilometragem: 20500, 
          servicosRealizados: [
            { id: 1, nome: 'Troca de óleo e filtro', preco: 250 },
            { id: 3, nome: 'Verificação do sistema de freios', preco: 120 }
          ], 
          pecasTrocadas: [
            { id: 1, nome: 'Filtro de Óleo - Motor X',marca: 'Bosch', estoque: 0, preco: 85.50, fotoUrl: 'assets/images/filtrooleo.webp' },
            { id: 5, nome: 'Filtro de Ar do Motor',marca: 'Bosch', estoque: 0, preco: 110.00, fotoUrl: 'assets/images/filtrooleo.webp' }
          ],
          mecanicoResponsavel: 'Carlos Pereira',
          custoTotal: 565.50
        }
      ]
    }
  ];

  constructor() { }

  getMeusVeiculos(): Observable<VeiculoCliente[]> {
    return of(this.MOCK_VEICULOS_CLIENTE);
  }
}