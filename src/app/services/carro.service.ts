import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carro } from '../models/carro'; // Verifique se o modelo Carro existe

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  // APONTA PARA O NOSSO ENDPOINT DE VEÍCULOS
  private apiUrl = 'http://localhost:8080/api/veiculos';

  constructor(private http: HttpClient) { }

  // Método para buscar todos os veículos
  getCarros(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.apiUrl);
  }

  // Método para buscar um veículo pelo chassi
  getCarroByChassi(chassi: string): Observable<Carro> {
    return this.http.get<Carro>(`${this.apiUrl}/${chassi}`);
  }

  // Método para cadastrar um novo veículo
  createCarro(carro: Carro): Observable<any> {
    // Backend espera o shape de Veiculo e valida placa (7 chars) e outros campos
    const placaSanitizada = (carro.placa || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    const chassi = (carro.numChassi || '').toUpperCase();
    const payload: any = {
      numChassi: chassi,
      placa: placaSanitizada,
      marcaCarro: carro.marcaCarro,
      modeloVeiculo: carro.modeloVeiculo,
      anoModelo: carro.anoModelo,
      quilometragem: carro.quilometragem,
      cor: carro.cor,
      precoVeiculo: carro.precoVeiculo,
      descricao: carro.descricao,
  fotos: carro.fotos,
      // Campos de FK esperados pelo DAO/BD
      idGarantia: 1, // precisa existir um registro na tabela Garantia com id = 1
      idStatusVeiculo: carro.idStatusVeiculo ?? 1,
  idtipoCombustivel: 1, // precisa existir um registro em TipoCombustivel com id = 1
    };
    return this.http.post(this.apiUrl, payload, { responseType: 'text' as 'json' });
  }

  // Método para atualizar um veículo existente
  updateCarro(chassi: string, carro: Carro): Observable<Carro> {
    return this.http.put<Carro>(`${this.apiUrl}/${chassi}`, carro);
  }

  // Método para deletar um veículo pelo chassi
  deleteCarro(chassi: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${chassi}`);
  }
}