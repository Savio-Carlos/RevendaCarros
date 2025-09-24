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
  styleUrls: ['./vendedorcarros.component.scss']
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
    this.carroService.getCarros().subscribe((data: Carro[]) => {
  // Mostra todos (disponíveis e vendidos) para o vendedor.
  this.carros = (data || []);
    });
  }

  openModal(carro?: Carro): void {
    const modalRef = this.modalService.open(CarromodalComponent);
    modalRef.componentInstance.carroToEdit = carro;

  modalRef.result.then((result: Carro) => {
      if (!result) return;
      const isEdit = !!carro;
      const op$ = isEdit
    ? this.carroService.updateCarro(result.numChassi, result)
    : this.carroService.createCarro(result);

      op$.subscribe({
        next: () => this.loadCarros(),
        error: (err) => {
          const msg = typeof err?.error === 'string' ? err.error : (err?.error?.message || err?.message || 'erro desconhecido');
          alert('Falha ao salvar veículo: ' + msg);
        },
      });
    }).catch(() => {});
  }

  delete(carro: Carro): void {
    if (confirm(`Tem certeza que deseja deletar o carro ${carro.modeloVeiculo}?`)) {
      this.carroService.deleteCarro(carro.numChassi).subscribe({
        next: () => this.loadCarros(),
        error: (err) => {
          const msg = typeof err?.error === 'string' ? err.error : (err?.error?.message || err?.message || 'erro desconhecido');
          alert('Falha ao deletar veículo: ' + msg);
        },
      });
    }
  }

}