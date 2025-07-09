import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Carro } from '../../../../models/carro';
import { CarroService } from '../../../../services/carro.service';
import { CarromodalComponent } from '../../../carros/carromodal/carromodal.component';

@Component({
  selector: 'app-vendedor-carros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendedorcarros.component.html',
})
export class VendedorcarrosComponent implements OnInit {
  carros: Carro[] = [];

  constructor(
    private carroService: CarroService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadCarros();
  }

  loadCarros(): void {
    this.carroService.getAll().subscribe(data => {
      this.carros = data;
    });
  }

  openModal(carro?: Carro): void {
    const modalRef = this.modalService.open(CarromodalComponent);
    modalRef.componentInstance.carroToEdit = carro;

    modalRef.result.then(result => {
      if (!result) return;

      if (carro && carro.id) { // Editing an existing car
        this.carroService.update(result).subscribe(() => this.loadCarros());
      } else { // Adding a new car
        this.carroService.add(result).subscribe(() => this.loadCarros());
      }
    }).catch(() => {});
  }

  delete(carro: Carro): void {
    if (confirm(`Tem certeza que deseja deletar o carro ${carro.modelo}?`)) {
      this.carroService.delete(carro.id).subscribe(() => {
        this.loadCarros();
      });
    }
  }
}