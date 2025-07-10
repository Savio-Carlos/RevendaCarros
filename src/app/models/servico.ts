export class Servico {
    id!: number;
    nome!: string;
    descricao!: string;
    preco!: number;
    categoria!: 'Lavagem' | 'Funilaria' | 'Estética' | 'Manutenção';
    imagemUrl!: string;
}