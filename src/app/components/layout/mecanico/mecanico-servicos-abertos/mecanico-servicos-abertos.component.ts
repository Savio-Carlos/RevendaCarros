import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Revisao } from '../../../../models/revisao';
import { OrdemServicoService } from '../../../../services/ordem-servico.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mecanico-servicos-abertos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mecanico-servicos-abertos.component.html',
})
export class MecanicoServicosAbertosComponent implements OnInit {
  ordensAbertas: Revisao[] = [];

  constructor(private ordemServicoService: OrdemServicoService) {}

  ngOnInit(): void {
    this.loadOrdens();
  }

  loadOrdens(): void {
    this.ordemServicoService.getOrdens().pipe(
      map(ordens => ordens.filter(o => o.status === 'Em Aberto'))
    ).subscribe(data => {
      this.ordensAbertas = data;
    });
  }

  finalizarServico(ordem: Revisao): void {
    if (confirm(`Tem certeza que deseja finalizar o serviço para o veículo ${ordem.veiculoDescricao}?`)) {
      this.ordemServicoService.finalizarOrdem(ordem.id).subscribe(() => {
        alert('Serviço finalizado com sucesso!');
      });
    }
  }
}