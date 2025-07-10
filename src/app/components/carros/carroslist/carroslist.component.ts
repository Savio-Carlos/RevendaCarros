import { Component, OnInit } from '@angular/core';
import { CarrosfilterComponent, CarrosFilter } from '../carrosfilter/carrosfilter.component';
import { CarroService } from '../../../services/carro.service';
import { Carro } from '../../../models/carro';
import { CommonModule } from '@angular/common';    
import { FormsModule } from '@angular/forms';                 
import { RouterModule, RouterLink } from '@angular/router';         

@Component({
  imports: [FormsModule, CommonModule, RouterModule, CarrosfilterComponent, RouterLink],
  selector: 'app-carros-list',
  templateUrl: './carroslist.component.html',
})
export class CarroslistComponent implements OnInit {
  carros: Carro[] = [];
  carrosFiltrados: Carro[] = [];

  constructor(private carroService: CarroService) {}

  ngOnInit() {
    this.carroService.getAll().subscribe(list => {
      this.carros = list;
      this.carrosFiltrados = [...this.carros];
    });
  }

  onFilterChange(f: CarrosFilter) {
    this.carrosFiltrados = this.carros.filter(c => {
      let ok = true;

      // Modelo (contém)
      if (f.modelo) {
        ok = ok && c.modelo.toLowerCase().includes(f.modelo.toLowerCase());
      }

      // Marca (contém)
      if (f.marca) {
        ok = ok && c.marca.toLowerCase().includes(f.marca.toLowerCase());
      }

      // Ano mínimo
      if (f.anoMin != null) {
        ok = ok && c.ano >= f.anoMin!;
      }

      // Ano máximo
      if (f.anoMax != null) {
        ok = ok && c.ano <= f.anoMax!;
      }

      // Preço mínimo
      if (f.precoMin != null) {
        ok = ok && c.preco >= f.precoMin!;
      }

      // Preço máximo
      if (f.precoMax != null) {
        ok = ok && c.preco <= f.precoMax!;
      }

      // Combustível (igual)
      if (f.combustivel) {
        ok = ok && c.combustivel.toLowerCase() === f.combustivel.toLowerCase();
      }

      // Câmbio (igual)
      if (f.cambio) {
        ok = ok && c.cambio.toLowerCase() === f.cambio.toLowerCase();
      }

      // Kms máximos
      if (f.kmsMax != null) {
        ok = ok && c.kms <= f.kmsMax!;
      }

      return ok;
    });
  }
}