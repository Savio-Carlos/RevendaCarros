import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Servico } from '../../../models/servico';
import { ServicoService } from '../../../services/servico.service';

@Component({
  selector: 'app-servicoslist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './servicoslist.component.html',
})
export class ServicoslistComponent implements OnInit {

  todosOsServicos: Servico[] = [];
  servicosFiltrados: Servico[] = [];
  categorias: string[] = [];
  categoriaSelecionada: string = 'Lavagem'; // Categoria inicial

  constructor(private servicoService: ServicoService) {}

  ngOnInit(): void {
    this.servicoService.getAll().subscribe(data => {
      this.todosOsServicos = data;
      // Extrai as categorias únicas e ordena
      this.categorias = [...new Set(data.map(s => s.categoria))].sort();
      // Filtra pela categoria inicial
      this.filtrarPorCategoria(this.categoriaSelecionada);
    });
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaSelecionada = categoria;
    this.servicosFiltrados = this.todosOsServicos.filter(s => s.categoria === categoria);
  }
}