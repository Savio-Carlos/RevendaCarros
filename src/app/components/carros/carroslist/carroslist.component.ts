import { Component, OnInit, inject } from '@angular/core';
import { Carro } from '../../../models/carro';
import { CarroService } from '../../../services/carro.service'; // IMPORTE O NOSSO SERVIÇO
import { DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrosFilter, CarrosfilterComponent } from '../carrosfilter/carrosfilter.component';


@Component({
  selector: 'app-carroslist',
  templateUrl: './carroslist.component.html',
  styleUrls: ['./carroslist.component.css'],
  imports: [DecimalPipe,CommonModule,RouterModule,CarrosfilterComponent]
})
export class CarroslistComponent implements OnInit {

  carros: Carro[] = [];
  carroService = inject(CarroService); // INJETE O SERVIÇO
  carrosFiltrados: any[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.carregarCarros();
  }

  carregarCarros() {
    this.carroService.getCarros().subscribe({
      next: (carrosDoBackend) => {
  this.carros = carrosDoBackend || [];
  // Inicializa exibindo apenas veículos disponíveis (status = 1)
  this.carrosFiltrados = this.carros.filter(c => c.idStatusVeiculo === 1);
  console.log('Carros carregados com sucesso!', this.carros);
      },
      error: (err) => {
        console.error('Erro ao carregar carros', err);
        alert('Não foi possível carregar a lista de carros.');
      }
    }); 
  }

  onFilterChange(f: CarrosFilter) {
    this.carrosFiltrados = this.carros.filter(c => {
      // Sempre ocultar vendidos (status != 1)
      let ok = c.idStatusVeiculo === 1;

      // Modelo (contém)
      if (f.modelo) {
        ok = ok && c.modeloVeiculo.toLowerCase().includes(f.modelo.toLowerCase());
      }

      // Marca (contém)
      if (f.marca) {
        ok = ok && c.marcaCarro.toLowerCase().includes(f.marca.toLowerCase());
      }

      // Ano mínimo
      if (f.anoMin != null) {
        ok = ok && c.anoModelo >= f.anoMin!;
      }

      // Ano máximo
      if (f.anoMax != null) {
        ok = ok && c.anoModelo <= f.anoMax!;
      }

      // Preço mínimo
      if (f.precoMin != null) {
        ok = ok && c.precoVeiculo >= f.precoMin!;
      }

      // Preço máximo
      if (f.precoMax != null) {
        ok = ok && c.precoVeiculo <= f.precoMax!;
      }

      // Kms máximos
      if (f.kmsMax != null) {
        ok = ok && c.quilometragem <= f.kmsMax!;
      }

      return ok;
    });
  }
}