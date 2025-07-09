import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../../services/cliente.service';
import { VeiculoCliente } from '../../../../models/veiculocliente';

@Component({
  selector: 'app-cliente-servicos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clienteservicos.component.html',
})
export class ClienteServicosComponent implements OnInit {
  meusVeiculos: VeiculoCliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getMeusVeiculos().subscribe(data => {
      this.meusVeiculos = data.filter(v => v.revisoes && v.revisoes.length > 0);
    });
  }
}