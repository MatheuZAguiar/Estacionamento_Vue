import AbstractEntity from './abstract.entity';
import Modelo from './modelo';
import { Cor } from './cor';
import { Tipo } from './tipo';
import Movimentacao from './movimentacao';

export default class Veiculo extends AbstractEntity {
  placa!: string;
  modelo!: Modelo;
  cor!: Cor;
  tipo!: Tipo;
  anoModelo!: number;
  movimentacao?: Movimentacao;

  constructor(data?: Partial<Veiculo>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}
