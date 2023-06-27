import AbstractEntity from './abstract.entity';
import Marca from './marca';

export default class Modelo extends AbstractEntity {
  nomeModelo!: string;
  marca?: Marca;

  constructor(data?: Partial<Modelo>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}
