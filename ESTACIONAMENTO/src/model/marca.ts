import AbstractEntity from './abstract.entity';

export default class Marca extends AbstractEntity {
  nomeMarca!: string;

  constructor(data?: Partial<Marca>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}