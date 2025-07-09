import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface PecasFilter {
  nome?: string;
  marca?: string;
  precoMax?: number;
}

@Component({
  selector: 'app-pecas-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pecasfilter.component.html',
})
export class PecasfilterComponent {
  @Output() filterChange = new EventEmitter<PecasFilter>();

  f: PecasFilter = {};

  emitir() {
    this.filterChange.emit({ ...this.f });
  }
}