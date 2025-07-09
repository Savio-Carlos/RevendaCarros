import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Carro } from '../../../models/carro';

@Component({
  selector: 'app-carro-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carromodal.component.html',
})
export class CarromodalComponent implements OnInit {
  @Input() carroToEdit?: Carro;

  carro: Carro = new Carro();
  isEditMode = false;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (this.carroToEdit) {
      this.isEditMode = true;
      this.carro = { ...this.carroToEdit }; // Create a copy to edit
    }
  }

  save(): void {
    this.activeModal.close(this.carro);
  }
}