import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Revisao } from '../../../../models/revisao';
import { OrdemServicoService } from '../../../../services/ordem-servico.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mecanico-historico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mecanico-historico.component.html',
})
export class MecanicoHistoricoComponent implements OnInit {
  ordensConcluidas: Revisao[] = [];

  constructor(private ordemServicoService: OrdemServicoService) {}

  ngOnInit(): void {
    this.ordemServicoService.getOrdens().pipe(
      map(ordens => ordens.filter(o => o.status === 'Concluído'))
    ).subscribe(data => {
      this.ordensConcluidas = data;
    });
  }
}