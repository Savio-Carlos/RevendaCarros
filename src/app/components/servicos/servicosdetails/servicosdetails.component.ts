import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Servico } from '../../../models/servico';
import { ServicoService } from '../../../services/servico.service';

@Component({
  selector: 'app-servicosdetails',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './servicosdetails.component.html',
})
export class ServicosdetailsComponent implements OnInit {
  servico?: Servico;

  constructor(
    private route: ActivatedRoute,
    private servicoService: ServicoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const servicoId = +idParam;
      this.servicoService.getById(servicoId).subscribe(data => {
        this.servico = data;
      });
    }
  }
}