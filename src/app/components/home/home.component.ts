import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Carro } from '../../models/carro';
import { CarroService } from '../../services/carro.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  carrosDestaque: Carro[] = [];

  constructor(private carroService: CarroService) {}

  ngOnInit(): void {
    // Pega os 3 primeiros carros do serviço para usar como destaque
    this.carroService.getAll().subscribe(carros => {
      this.carrosDestaque = carros.slice(0, 3);
    });
  }
}