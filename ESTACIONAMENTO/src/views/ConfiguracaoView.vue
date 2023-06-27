<template>
  <div class="configuracao">
    <h1 class="text-center">CONFIGURAÇÃO</h1>

    <div class="row justify-content-end mb-3">
      <div class="col-2">
        <button class="btn btn-primary" @click="ativarModoCadastro">Editar Configuração</button>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-12">
        <div v-if="!modoCadastro">
          <table class="table table-responsive">
            <thead>
              <tr>
                <th>Valor da Hora</th>
                <th>Valor do Minuto de Multa</th>
                <th>Horário de Início de Expediente</th>
                <th>Horário de Fim de Expediente</th>
                <th>Tempo para Desconto</th>
                <th>Tempo de Desconto</th>
                <th>Gerar Desconto</th>
                <th>Número de Vagas para Moto</th>
                <th>Número de Vagas para Carro</th>
                <th>Número de Vagas para Van</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="config in configuracoes" :key="config.id">
                <td>{{ config.valorHora }}</td>
                <td>{{ config.valorMinutoMulta }}</td>
                <td>{{ config.inicioExpediente }}</td>
                <td>{{ config.fimExpediente }}</td>
                <td>{{ config.tempoParaDesconto }}</td>
                <td>{{ config.tempoDeDesconto }}</td>
                <td>{{ config.gerarDesconto ? 'Sim' : 'Não' }}</td>
                <td>{{ config.vagasMoto }}</td>
                <td>{{ config.vagasCarro }}</td>
                <td>{{ config.vagasVan }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else>
          <form @submit.prevent="salvarConfiguracao">
            <div class="form-group">
              <label for="valorHora">Valor da Hora:</label>
              <input v-model="configuracao.valorHora" type="number" class="form-control" id="valorHora" required>
            </div>
            <div class="form-group">
              <label for="valorMinutoMulta">Valor do Minuto de Multa:</label>
              <input v-model="configuracao.valorMinutoMulta" type="number" class="form-control" id="valorMinutoMulta" required>
            </div>
            <div class="form-group">
              <label for="inicioExpediente">Horário de Início de Expediente:</label>
              <input v-model="configuracao.inicioExpediente" type="time" class="form-control" id="inicioExpediente" required>
            </div>
            <div class="form-group">
              <label for="fimExpediente">Horário de Fim de Expediente:</label>
              <input v-model="configuracao.fimExpediente" type="time" class="form-control" id="fimExpediente" required>
            </div>
            <div class="form-group">
              <label for="tempoParaDesconto">Tempo para Desconto:</label>
              <input v-model="configuracao.tempoParaDesconto" type="time" class="form-control" id="tempoParaDesconto" required>
            </div>
            <div class="form-group">
              <label for="tempoDeDesconto">Tempo de Desconto:</label>
              <input v-model="configuracao.tempoDeDesconto" type="time" class="form-control" id="tempoDeDesconto" required>
            </div>
            <div class="form-group">
              <label for="gerarDesconto">Gerar Desconto:</label>
              <input v-model="configuracao.gerarDesconto" type="checkbox" id="gerarDesconto">
            </div>
            <div class="form-group">
              <label for="vagasMoto">Número de Vagas para Moto:</label>
              <input v-model="configuracao.vagasMoto" type="number" class="form-control" id="vagasMoto" required>
            </div>
            <div class="form-group">
              <label for="vagasCarro">Número de Vagas para Carro:</label>
              <input v-model="configuracao.vagasCarro" type="number" class="form-control" id="vagasCarro" required>
            </div>
            <div class="form-group">
              <label for="vagasVan">Número de Vagas para Van:</label>
              <input v-model="configuracao.vagasVan" type="number" class="form-control" id="vagasVan" required>
            </div>
            <button type="submit" class="btn btn-success">Salvar</button>
            <button class="btn btn-secondary" @click="cancelarCadastro">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

export default {
  name: 'Configuracao',
  data() {
    return {
      configuracoes: [],
      configuracao: {
        valorHora: null,
        valorMinutoMulta: null,
        inicioExpediente: null,
        fimExpediente: null,
        tempoParaDesconto: null,
        tempoDeDesconto: null,
        gerarDesconto: false,
        vagasMoto: null,
        vagasCarro: null,
        vagasVan: null
      },
      modoCadastro: false
    };
  },
  mounted() {
    this.buscarConfiguracoes();
  },
  methods: {
    buscarConfiguracoes() {
      axios
        .get('http://localhost:8080/api/configuracao')
        .then((response) => {
          this.configuracoes = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    ativarModoCadastro(config) {
      this.editarConfiguracao(config);
      this.modoCadastro = true;
    },
    editarConfiguracao(config) {
      this.configuracao = { ...config };
    },
    cancelarCadastro() {
      this.modoCadastro = false;
      this.resetarConfiguracao();
    },
    resetarConfiguracao() {
      this.configuracao = {
        valorHora: null,
        valorMinutoMulta: null,
        inicioExpediente: null,
        fimExpediente: null,
        tempoParaDesconto: null,
        tempoDeDesconto: null,
        gerarDesconto: false,
        vagasMoto: null,
        vagasCarro: null,
        vagasVan: null
      };
    },
    salvarConfiguracao() {
      axios
  .put('http://localhost:8080/api/configuracao/1', this.configuracao)
  .then((response) => {
    console.log('Configuração atualizada:', response.data);
    this.buscarConfiguracoes();
    this.cancelarCadastro();
  })
  .catch((error) => {
    console.error(error);
  });

    }
  }
};
</script>

<style>
</style>
