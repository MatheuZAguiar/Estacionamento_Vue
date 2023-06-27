import AbstractEntity from './abstract.entity';
import Condutor from './condutor';
import Veiculo from './veiculo';

export default class Movimentacao extends AbstractEntity {
  condutor!: Condutor;
  veiculo!: Veiculo;
  dataEntrada!: Date;
  dataSaida?: Date;
  tempo?: string;
  tempoDesconto?: string;
  tempoMulta?: string;
  valorDesconto?: number;
  valorHora!: number;
  valorTotal?: number;
  valorMulta?: number;
  valorHoraMulta?: number;

  constructor(data?: Partial<Movimentacao>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}
