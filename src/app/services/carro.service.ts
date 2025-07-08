// carro.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Carro } from '../models/carro';
const MOCK_CARROS: Carro[] = [
  {
    id: 1,
    modelo: 'HB20 Sense',
    marca: 'Hyundai',
    ano: 2022,
    preco: 75000,
    kms: 25000,
    combustivel: 'Flex',
    cambio: 'Manual',
    fotoUrl: 'assets/images/hb20.webp' 
  },
  {
    id: 2,
    modelo: 'Onix Plus Turbo',
    marca: 'Chevrolet',
    ano: 2023,
    preco: 96000,
    kms: 15000,
    combustivel: 'Flex',
    cambio: 'Automático',
    fotoUrl: 'assets/images/onix.webp'
  },
  {
    id: 3,
    modelo: 'Compass Longitude',
    marca: 'Jeep',
    ano: 2021,
    preco: 140000,
    kms: 45000,
    combustivel: 'Diesel',
    cambio: 'Automático',
    fotoUrl: 'assets/images/compass.webp'
  },
  {
    id: 4,
    modelo: 'Mobi Like',
    marca: 'Fiat',
    ano: 2024,
    preco: 72000,
    kms: 5000,
    combustivel: 'Gasolina',
    cambio: 'Manual',
    fotoUrl: 'assets/images/mobi.webp'
  },
  {
    id: 5,
    modelo: 'Corolla Cross XRE',
    marca: 'Toyota',
    ano: 2023,
    preco: 177000,
    kms: 12000,
    combustivel: 'Flex',
    cambio: 'Automático',
    fotoUrl: 'assets/images/cross.png'
  },
  {
    id: 6,
    modelo: 'Corolla Cross XRE',
    marca: 'Toyota',
    ano: 2023,
    preco: 177000,
    kms: 12000,
    combustivel: 'Flex',
    cambio: 'Automático',
    fotoUrl: 'assets/images/cross.png'
  }
];

@Injectable({ providedIn: 'root' })
export class CarroService {
  constructor() {}

  getAll(): Observable<Carro[]> {
    return of(MOCK_CARROS);
  }

    getById(id: number): Observable<Carro | undefined> {
    const carro = MOCK_CARROS.find(c => c.id === id);
    return of(carro);
  }
}