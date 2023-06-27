<template>
  <div class="movimentacao">
    <h1 class="text-center">MOVIMENTAÇÃO</h1>
    
    <!-- Botão de adicionar movimentação -->
    <div class="col-12 d-flex justify-content-end">
      <div class="col-2">
        <button class="btn btn-success" @click="ativarModoCadastro">Nova Movimentação</button>
      </div>
    </div>
    
    <div class="row justify-content-center">
      <div class="col-12">
        <table class="table table-striped">
          <thead>
            <tr class="custom-header">
              <th>ID</th>
              <th>Condutor</th>
              <th>Veículo</th>
              <th>Data Entrada</th>
              <th>Data Saída</th>
              <th>Tempo</th>
              <th>Valor Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movimentacao in movimentacoes" :key="movimentacao.id">
              <td>{{ movimentacao.id }}</td>
              <td>{{ movimentacao.condutor.nomeCondutor }}</td>
              <td>{{ movimentacao.veiculo.placa }}</td>
              <td>{{ movimentacao.dataEntrada }}</td>
              <td>{{ movimentacao.dataSaida }}</td>
              <td>{{ movimentacao.tempo }}</td>
              <td>{{ movimentacao.valorTotal }}</td>
              <td>
                <button class="btn btn-primary" @click="editarMovimentacao(movimentacao)">Editar</button>
                <button class="btn btn-danger" @click="excluirMovimentacao(movimentacao)">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

        <!-- Formulário de cadastro -->
    <div v-if="modoCadastro">
      <div class="row justify-content-center">
        <div class="col-10">
          <h2>Cadastro de Movimentação</h2>
          <form @submit.prevent="adicionarMovimentacao">
            <div class="form-group">
              <label for="condutor">Condutor:</label>
              <select v-model="novaMovimentacao.condutor" class="form-control" id="condutor" required>
                <option v-for="condutor in condutores" :value="condutor.id">{{ condutor.nomeCondutor }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="veiculo">Veículo:</label>
              <select v-model="novaMovimentacao.veiculo" class="form-control" id="veiculo" required>
                <option v-for="veiculo in veiculos" :value="veiculo.id">{{ veiculo.placa }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="dataEntrada">Data Entrada:</label>
              <input v-model="novaMovimentacao.dataEntrada" type="datetime-local" class="form-control" id="dataEntrada" required>
            </div>
            <div class="form-group">
              <label for="dataSaida">Data Saída:</label>
              <input v-model="novaMovimentacao.dataSaida" type="datetime-local" class="form-control" id="dataSaida">
            </div>
            <div class="form-group">
              <label for="tempo">Tempo:</label>
              <input v-model="novaMovimentacao.tempo" type="time" class="form-control" id="tempo">
            </div>
            <div class="form-group">
              <label for="valorTotal">Valor Total:</label>
              <input v-model="novaMovimentacao.valorTotal" type="number" step="0.01" class="form-control" id="valorTotal">
            </div>
            <button type="submit" class="btn btn-primary">Salvar</button>
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
  data() {
    return {
      movimentacoes: [],
      condutores: [],
      veiculos: [],
      modoCadastro: false,
      novaMovimentacao: {
        id: null,
        condutor: null,
        veiculo: null,
        dataEntrada: null,
        dataSaida: null,
        tempo: null,
        valorTotal: null
      },
    };
  },
  mounted() {
    this.carregarMovimentacoes();
    this.carregarCondutores();
    this.carregarVeiculos();
  },
  methods: {

    formatarDataInput(data) {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  },

    carregarMovimentacoes() {
      axios
        .get('http://localhost:8080/api/movimentacao')
        .then((response) => {
          this.movimentacoes = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    carregarCondutores() {
      axios
        .get('http://localhost:8080/api/condutor')
        .then((response) => {
          this.condutores = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    carregarVeiculos() {
      axios
        .get('http://localhost:8080/api/veiculo')
        .then((response) => {
          this.veiculos = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    editarMovimentacao(movimentacao) {
  // Copiar os dados da movimentação selecionada para o objeto novaMovimentacao
  this.novaMovimentacao = {
    id: movimentacao.id,
    condutor: movimentacao.condutor.id,
    veiculo: movimentacao.veiculo.id,
    dataEntrada: this.formatarDataInput(movimentacao.dataEntrada),
    dataSaida: this.formatarDataInput(movimentacao.dataSaida),
    tempo: movimentacao.tempo.join(':'),
    valorTotal: movimentacao.valorTotal
  };
  this.modoCadastro = true;
},

    excluirMovimentacao(movimentacao) {
      if (confirm('Deseja excluir a movimentação?')) {
        axios
          .delete(`http://localhost:8080/api/movimentacao/${movimentacao.id}`)
          .then((response) => {
            console.log('Movimentação excluída:', response.data);
            this.carregarMovimentacoes();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    ativarModoCadastro() {
      this.modoCadastro = true;
    },
    cancelarCadastro() {
      this.modoCadastro = false;
      this.resetarNovaMovimentacao();
    },
    resetarNovaMovimentacao() {
      this.novaMovimentacao = {
        id: null,
        condutor: null,
        veiculo: null,
        dataEntrada: null,
        dataSaida: null,
        tempo: null,
        valorTotal: null
      };
    },
    adicionarMovimentacao() {
  if (this.novaMovimentacao.id) {
    // Editar movimentação existente
    axios
      .put(`http://localhost:8080/api/movimentacao/${this.novaMovimentacao.id}`, this.novaMovimentacao)
      .then((response) => {
        console.log('Movimentação atualizada:', response.data);
        this.carregarMovimentacoes();
        this.cancelarCadastro();
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    // Adicionar nova movimentação
    axios
      .post('http://localhost:8080/api/movimentacao', this.novaMovimentacao)
      .then((response) => {
        console.log('Movimentação adicionada:', response.data);
        this.carregarMovimentacoes();
        this.cancelarCadastro();
      })
      .catch((error) => {
        console.error(error);
      });
  }
},

  },
};
</script>

<style scoped>
.custom-header {
  background-color: #007bff;
  color: white;
}
</style>
