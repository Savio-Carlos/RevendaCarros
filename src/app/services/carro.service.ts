import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Carro } from '../models/carro';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  // We make this a private property so it can be modified by our methods
  private MOCK_CARROS: Carro[] = [
    { id: 1, modelo: 'HB20 Sense', marca: 'Hyundai', ano: 2022, preco: 75000, kms: 25000, combustivel: 'Flex', cambio: 'Manual', fotoUrl: 'assets/images/hb20.webp' },
    { id: 2, modelo: 'Onix Plus Turbo', marca: 'Chevrolet', ano: 2023, preco: 96000, kms: 15000, combustivel: 'Flex', cambio: 'Automático', fotoUrl: 'assets/images/onix.webp' },
    { id: 3, modelo: 'Compass Longitude', marca: 'Jeep', ano: 2021, preco: 140000, kms: 45000, combustivel: 'Diesel', cambio: 'Automático', fotoUrl: 'assets/images/compass.webp' },
    { id: 4, modelo: 'Mobi Like', marca: 'Fiat', ano: 2024, preco: 72000, kms: 5000, combustivel: 'Gasolina', cambio: 'Manual', fotoUrl: 'assets/images/mobi.webp' },
    { id: 5, modelo: 'Corolla Cross XRE', marca: 'Toyota', ano: 2023, preco: 177000, kms: 12000, combustivel: 'Flex', cambio: 'Automático', fotoUrl: 'assets/images/cross.png' }
  ];

  constructor() { }

  getAll(): Observable<Carro[]> {
    return of(this.MOCK_CARROS);
  }

  getById(id: number): Observable<Carro | undefined> {
    const carro = this.MOCK_CARROS.find(c => c.id === id);
    return of(carro);
  }

  // ✅ NEW METHOD TO ADD A CAR
  add(carro: Carro): Observable<Carro> {
    // Simulate creating a new ID
    const newId = Math.max(...this.MOCK_CARROS.map(c => c.id)) + 1;
    carro.id = newId;
    this.MOCK_CARROS.push(carro);
    return of(carro);
  }

  // ✅ NEW METHOD TO UPDATE A CAR
  update(carroToUpdate: Carro): Observable<Carro> {
    const index = this.MOCK_CARROS.findIndex(c => c.id === carroToUpdate.id);
    if (index !== -1) {
      this.MOCK_CARROS[index] = carroToUpdate;
    }
    return of(carroToUpdate);
  }

  // ✅ NEW METHOD TO DELETE A CAR
  delete(id: number): Observable<any> {
    const index = this.MOCK_CARROS.findIndex(c => c.id === id);
    if (index !== -1) {
      this.MOCK_CARROS.splice(index, 1);
    }
    return of(null);
  }
}