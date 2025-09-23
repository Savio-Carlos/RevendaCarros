import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';                  // para ngModel
import { RouterModule } from '@angular/router';   
import { CommonModule } from '@angular/common';              // para routerLink

export interface CarrosFilter {
  modelo?: string;
  marca?: string;
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  kmsMax?: number;
}

@Component({
  imports: [FormsModule, RouterModule,CommonModule],
  selector: 'app-carros-filter',
  templateUrl: './carrosfilter.component.html',
})
export class CarrosfilterComponent {
  @Output() filterChange = new EventEmitter<CarrosFilter>();

  // your local filter object with all fields matching CarrosFilter
  f: CarrosFilter = {
    modelo: '',
    marca: '',
    anoMin: undefined,
    anoMax: undefined,
    precoMin: undefined,
    precoMax: undefined,
    kmsMax: undefined
  };

  emitir() {
    this.filterChange.emit({ ...this.f });
  }
}
