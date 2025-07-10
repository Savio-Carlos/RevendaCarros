import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Peca } from '../../../../models/peca';
import { PecaService } from '../../../../services/peca.service';
import { PecamodalComponent } from '../../../pecas/pecamodal/pecamodal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendedor-pecas',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './vendedorpecas.component.html',
})
export class VendedorpecasComponent implements OnInit {
  todasAsPecas: Peca[] = [];
  lowStockThreshold = 10; 

  pecasFiltradas: Peca[] = [];
  
  termoBusca: string = '';

  constructor(
    private pecaService: PecaService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadPecas();
  }

  loadPecas(): void {
    this.pecaService.getAll().subscribe(data => {
      this.todasAsPecas = data;
      this.filtrarPecas();
    });
  }

    filtrarPecas(): void {
    if (!this.termoBusca) {
      this.pecasFiltradas = this.todasAsPecas;
    } else {
      this.pecasFiltradas = this.todasAsPecas.filter(peca => 
        peca.nome.toLowerCase().includes(this.termoBusca.toLowerCase())
      );
    }
  }

  openModal(peca?: Peca): void {
    const modalRef = this.modalService.open(PecamodalComponent);
    modalRef.componentInstance.pecaToEdit = peca;

    modalRef.result.then(result => {
      if (!result) return;

      if (peca && peca.id) {
        this.pecaService.update(result).subscribe(() => this.loadPecas());
      } else {
        this.pecaService.add(result).subscribe(() => this.loadPecas());
      }
    }).catch(() => {});
  }

  delete(peca: Peca): void {
    if (confirm(`Tem certeza que deseja deletar a peça ${peca.nome}?`)) {
      this.pecaService.delete(peca.id).subscribe(() => {
        this.loadPecas();
      });
    }
  }
}