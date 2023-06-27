export default class AbstractEntity {
    id!: number;
    cadastro!: Date;
    edicao?: Date;
    ativo!: boolean;
  
    constructor(data?: Partial<AbstractEntity>) {
      if (data) {
        Object.assign(this, data);  
      }
    }
  }
  