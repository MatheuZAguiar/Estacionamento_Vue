<template>
    <div class="hello">
      <h1>{{"ESTACIONAMENTO"}}</h1>
      <div id="condutorInfo"></div>
    </div>
  </template>
  
  <script lang="ts">
  import moment, { Duration } from 'moment';
  import { Decimal } from 'decimal.js';
  
  class Condutor {
    id: number;
    nomeCondutor: string;
    cpf: string;
    telefone: string;
    tempoDesconto: moment.Moment;
    tempoPago: moment.Moment;
  
    constructor(
      id: number,
      nomeCondutor: string,
      cpf: string,
      telefone: string,
      tempoDesconto: moment.Moment,
      tempoPago: moment.Moment
    ) {
      this.id = id;
      this.nomeCondutor = nomeCondutor;
      this.cpf = cpf;
      this.telefone = telefone;
      this.tempoDesconto = tempoDesconto;
      this.tempoPago = tempoPago;
    }
  }
  
  class Marca {
    id: number;
    nome: string;
  
    constructor(id: number, nome: string) {
      this.id = id;
      this.nome = nome;
    }
  }
  
  class Modelo {
    id: number;
    nomeModelo: string;
    marcaId: number;
  
    constructor(id: number, nomeModelo: string, marcaId: number) {
      this.id = id;
      this.nomeModelo = nomeModelo;
      this.marcaId = marcaId;
    }
  }
  
  class Veiculo {
    id: number;
    placa: string;
    modeloId: number;
    corId: number;
    tipoId: number;
    anoModelo: number;
  
    constructor(id: number, placa: string, modeloId: number, corId: number, tipoId: number, anoModelo: number) {
      this.id = id;
      this.placa = placa;
      this.modeloId = modeloId;
      this.corId = corId;
      this.tipoId = tipoId;
      this.anoModelo = anoModelo;
    }
  }
  
  class Cor {
    id: number;
    nomeCor: string;
  
    constructor(id: number, nomeCor: string) {
      this.id = id;
      this.nomeCor = nomeCor;
    }
  }
  
  class Tipo {
    id: number;
    nomeTipo: string;
  
    constructor(id: number, nomeTipo: string){
      this.id = id;
      this.nomeTipo = nomeTipo;
    }
  }
  
  class Configuracao {
    id: number;
    valorMinutoMulta: number;
    inicioExpediente: Date;
    fimExpediente: Date;
    tempoParaDesconto: Date;
    tempoDeDesconto: Date;
    gerarDesconto: boolean;
    vagasMoto: number;
    vagasCarro: number;
    vagasVan: number;
  
    constructor(
      id: number,
      valorMinutoMulta: number,
      inicioExpediente: Date,
      fimExpediente: Date,
      tempoParaDesconto: Date,
      tempoDeDesconto: Date,
      gerarDesconto: boolean,
      vagasMoto: number,
      vagasCarro: number,
      vagasVan: number
    ) {
      this.id = id;
      this.valorMinutoMulta = valorMinutoMulta;
      this.inicioExpediente = inicioExpediente;
      this.fimExpediente = fimExpediente;
      this.tempoParaDesconto = tempoParaDesconto;
      this.tempoDeDesconto = tempoDeDesconto;
      this.gerarDesconto = gerarDesconto;
      this.vagasMoto = vagasMoto;
      this.vagasCarro = vagasCarro;
      this.vagasVan = vagasVan;
    }
  }
  
  class Movimentacao {
    id: number;
    condutorId: number;
    veiculoId: number;
    dataEntrada: moment.Moment;
    dataSaida: moment.Moment;
    tempo: Duration;
    tempoDesconto: Duration;
    valorDesconto: Decimal;
    valorHora: Decimal;
    valorTotal: Decimal;
    valorMulta: Decimal;
    valorHoraMulta: Decimal;
  
    constructor(
      id: number,
      condutorId: number,
      veiculoId: number,
      dataEntrada: moment.Moment,
      dataSaida: moment.Moment,
      tempo: Duration,
      tempoDesconto: Duration,
      valorDesconto: Decimal,
      valorHora: Decimal,
      valorTotal: Decimal,
      valorMulta: Decimal,
      valorHoraMulta: Decimal
    ) {
      this.id = id;
      this.condutorId = condutorId;
      this.veiculoId = veiculoId;
      this.dataEntrada = dataEntrada;
      this.dataSaida = dataSaida;
      this.tempo = tempo;
      this.tempoDesconto = tempoDesconto;
      this.valorDesconto = valorDesconto;
      this.valorHora = valorHora;
      this.valorTotal = valorTotal;
      this.valorMulta = valorMulta;
      this.valorHoraMulta = valorHoraMulta;
    }
  }
  
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  #condutorInfo{
    color: #42b983;
  }
  </style>