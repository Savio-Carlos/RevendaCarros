import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Servico } from '../models/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private MOCK_SERVICOS: Servico[] = [
    { id: 1, nome: 'Lavagem Completa', descricao: 'Limpeza detalhada interna e externa, incluindo aspiração, limpeza de painéis e lavagem da carroceria com cera.', categoria: 'Lavagem', preco: 120.00, imagemUrl: 'assets/images/servico_lavagem_completa.jpg' },
    { id: 2, nome: 'Lavagem a Seco', descricao: 'Limpeza ecológica com produtos específicos que não arranham, ideal para uma limpeza rápida e eficiente.', categoria: 'Lavagem', preco: 80.00, imagemUrl: 'assets/images/servico_lavagem_seco.jpg' },
    { id: 3, nome: 'Higienização Automotiva', descricao: 'Ideal contra manchas, mau cheiro e bactérias. Limpeza profunda de estofados, teto e carpetes.', categoria: 'Lavagem', preco: 250.00, imagemUrl: 'assets/images/servico_higienizacao.jpg' },
    { id: 4, nome: 'Polimento e Cristalização', descricao: 'Processo que remove riscos superficiais e realça o brilho da pintura, com aplicação de uma camada protetora.', categoria: 'Estética', preco: 450.00, imagemUrl: 'assets/images/servico_polimento.jpg' },
    { id: 5, nome: 'Revisão de Freios', descricao: 'Verificação completa do sistema de freios, incluindo pastilhas, discos e fluido.', categoria: 'Manutenção', preco: 180.00, imagemUrl: 'assets/images/servico_freios.jpg' },
    { id: 6, nome: 'Pequenos Reparos de Funilaria', descricao: 'Correção de pequenos amassados e arranhões que não necessitam de pintura completa.', categoria: 'Funilaria', preco: 300.00, imagemUrl: 'assets/images/servico_funilaria.jpg' },
  ];

  constructor() { }

  getAll(): Observable<Servico[]> {
    return of(this.MOCK_SERVICOS);
  }

  getById(id: number): Observable<Servico | undefined> {
    return of(this.MOCK_SERVICOS.find(s => s.id === id));
  }
}