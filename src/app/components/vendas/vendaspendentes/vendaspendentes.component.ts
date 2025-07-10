import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendaPendente } from '../../../models/vendapendente';
import { VendaPendenteService } from '../../../services/vendapendente.service';

@Component({
  selector: 'app-vendas-pendentes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendaspendentes.component.html',
})
export class VendasPendentesComponent implements OnInit {
  vendasPendentes: VendaPendente[] = [];

  constructor(private vendaPendenteService: VendaPendenteService) {}

  ngOnInit(): void {
    this.vendaPendenteService.getVendasPendentes().subscribe(data => {
      this.vendasPendentes = data;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Aguardando Pagamento': return 'bg-warning text-dark';
      case 'Documentação': return 'bg-info text-dark';
      case 'Preparando Entrega': return 'bg-success';
      case 'Concluido': return 'bg-success';
      default: return 'bg-secondary';
    }
  }
}