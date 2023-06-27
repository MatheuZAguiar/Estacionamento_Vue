import AbstractEntity from './abstract.entity';

export default class Condutor extends AbstractEntity {
  nomeCondutor!: string;
  cpf!: string;
  telefone!: string;
  tempoDesconto?: string;
  tempoPago?: string;
  movimentacao?: Movimentacao;

  constructor(data?: Partial<Condutor>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}

export class Movimentacao {
  }