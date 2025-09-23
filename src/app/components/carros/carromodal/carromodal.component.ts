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

  carro: Carro = {
    numChassi: '',
    placa: '',
    marcaCarro: '',
    modeloVeiculo: '',
    anoModelo: new Date().getFullYear(),
    quilometragem: 0,
    cor: '',
    precoVeiculo: 0,
    descricao: '',
    fotos: '',
    idStatusVeiculo: 1,
  };
  isEditMode = false;
  maxAno = new Date().getFullYear() + 1;

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