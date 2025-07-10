import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Carro } from '../../../models/carro';
import { AddCarroService } from '../../../services/addcarro.service';

@Component({
  selector: 'app-associar-carro-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './associarcarromodal.component.html',
})
export class AssociarCarroModalComponent implements OnInit {
  carrosDisponiveis: Carro[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private associacaoService: AddCarroService
  ) {}

  ngOnInit(): void {
    this.associacaoService.getCarrosDisponiveis().subscribe(carros => {
      this.carrosDisponiveis = carros;
    });
  }

  selecionarCarro(carro: Carro): void {
    this.activeModal.close(carro);
  }
}