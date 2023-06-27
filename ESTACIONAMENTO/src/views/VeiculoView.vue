<template>
  <div class="veiculo">
    <h1 class="text-center">VEÍCULO</h1>
    <!-- Botão de cadastro -->
    <div class="col-12 d-flex justify-content-end">
      <div class="col-2">
        <button class="btn btn-success" @click="ativarModoCadastro">Novo Veículo</button>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-12">
        <table class="table table-striped">
          <thead>
            <tr class="custom-header">
              <th>ID</th>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Cor</th>
              <th>Tipo</th>
              <th>Ano do Modelo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="veiculo in veiculos" :key="veiculo.id">
              <td>{{ veiculo.id }}</td>
              <td>{{ veiculo.placa }}</td>
              <td>{{ veiculo.modelo.nomeModelo }}</td>
              <td>{{ veiculo.cor }}</td>
              <td>{{ veiculo.tipo }}</td>
              <td>{{ veiculo.anoModelo }}</td>
              <td>
                <button class="btn btn-primary" @click="editarVeiculo(veiculo)">Editar</button>
                <button class="btn btn-danger" @click="confirmarExclusao(veiculo)">Excluir</button>
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
          <h2>Cadastro de Veículo</h2>
          <form @submit.prevent="adicionarVeiculo">
            <div class="form-group">
              <label for="placa">Placa:</label>
              <input v-model="novoVeiculo.placa" type="text" class="form-control" id="placa" required>
            </div>
            <div class="form-group">
              <label for="modelo">Modelo:</label>
              <select v-model="novoVeiculo.modelo" class="form-control" id="modelo" required>
                <option v-for="modelo in modelos" :value="modelo">{{ modelo.nomeModelo }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="cor">Cor:</label>
              <select v-model="novoVeiculo.cor" class="form-control" id="cor" required>
                <option value="VERMELHO">Vermelho</option>
                <option value="VERDE">Verde</option>
                <option value="AZUL">Azul</option>
                <option value="BRANCO">Branco</option>
                <option value="CINZA">Cinza</option>
                <option value="PRETO">Preto</option>
                <option value="FANTASIA">Fantasia</option>
              </select>
            </div>
            <div class="form-group">
              <label for="tipo">Tipo:</label>
              <select v-model="novoVeiculo.tipo" class="form-control" id="tipo" required>
                <option value="VAN">Van</option>
                <option value="CARRO">Carro</option>
                <option value="MOTO">Moto</option>
              </select>
            </div>
            <div class="form-group">
              <label for="anoModelo">Ano do Modelo:</label>
              <input v-model="novoVeiculo.anoModelo" type="number" class="form-control" id="anoModelo" required>
            </div>
            <button type="submit" class="btn btn-success">Salvar</button>
            <button class="btn btn-secondary" @click="cancelarCadastro">Cancelar</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Formulário de edição -->
    <div v-if="modoEdicao">
      <div class="row justify-content-center">
        <div class="col-10">
          <h2>Editar Veículo</h2>
          <form @submit.prevent="atualizarVeiculo">
            <div class="form-group">
              <label for="placa">Placa:</label>
              <input v-model="veiculoEdicao.placa" type="text" class="form-control" id="placa" required>
            </div>
            <div class="form-group">
              <label for="modelo">Modelo:</label>
              <select v-model="veiculoEdicao.modelo.id" class="form-control" id="modelo" required>
                <option v-for="modelo in modelos" :value="modelo.id">{{ modelo.nomeModelo }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="cor">Cor:</label>
              <select v-model="veiculoEdicao.cor" class="form-control" id="cor" required>
                <option value="VERMELHO">Vermelho</option>
                <option value="VERDE">Verde</option>
                <option value="AZUL">Azul</option>
                <option value="BRANCO">Branco</option>
                <option value="CINZA">Cinza</option>
                <option value="PRETO">Preto</option>
                <option value="FANTASIA">Fantasia</option>
              </select>
            </div>
            <div class="form-group">
              <label for="tipo">Tipo:</label>
              <select v-model="veiculoEdicao.tipo" class="form-control" id="tipo" required>
                <option value="VAN">Van</option>
                <option value="CARRO">Carro</option>
                <option value="MOTO">Moto</option>
              </select>
            </div>
            <div class="form-group">
              <label for="anoModelo">Ano do Modelo:</label>
              <input v-model="veiculoEdicao.anoModelo" type="number" class="form-control" id="anoModelo" required>
            </div>
            <button type="submit" class="btn btn-success">Atualizar</button>
            <button class="btn btn-secondary" @click="cancelarEdicao">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      veiculos: [],
      modelos: [],
      novoVeiculo: {
        placa: '',
        modelo: '',
        cor: '',
        tipo: '',
        anoModelo: ''
      },
      veiculoEdicao: {
        id: '',
        placa: '',
        modelo: '',
        cor: '',
        tipo: '',
        anoModelo: ''
      },
      modoCadastro: false,
      modoEdicao: false
    };
  },
  created() {
    this.carregarVeiculos();
    this.carregarModelos();
  },
  mounted() {
    // this.carregarVeiculos();
  },
  methods: {
    carregarVeiculos() {
      axios.get('http://localhost:8080/api/veiculo')
        .then(response => {
          this.veiculos = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    carregarModelos() {
      axios.get('http://localhost:8080/api/modelo')
        .then(response => {
          this.modelos = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    adicionarVeiculo() {
      axios.post('http://localhost:8080/api/veiculo', this.novoVeiculo)
        .then(response => {
          this.veiculos.push(response.data);
          this.cancelarCadastro();
        })
        .catch(error => {
          console.error(error);
        });
    },
    editarVeiculo(veiculo) {
      this.veiculoEdicao.id = veiculo.id;
      this.veiculoEdicao.placa = veiculo.placa;
      this.veiculoEdicao.modelo = this.modelos.find(m => m.id === veiculo.modelo.id);
      this.veiculoEdicao.cor = veiculo.cor;
      this.veiculoEdicao.tipo = veiculo.tipo;
      this.veiculoEdicao.anoModelo = veiculo.anoModelo;
      this.modoEdicao = true;
    },
    atualizarVeiculo() {
      axios.put(`http://localhost:8080/api/veiculo/${this.veiculoEdicao.id}`, this.veiculoEdicao)
        .then(response => {
          const index = this.veiculos.findIndex(v => v.id === response.data.id);
          if (index !== -1) {
            this.veiculos.splice(index, 1, response.data);
          }
          this.cancelarEdicao();
          // this.carregarVeiculos();
        })
        .catch(error => {
          console.error(error);
        });
    },
    confirmarExclusao(veiculo) {
      if (confirm('Tem certeza de que deseja excluir este veículo?')) {
        this.excluirVeiculo(veiculo);
      }
    },
    excluirVeiculo(veiculo) {
      axios.delete(`http://localhost:8080/api/veiculo/${veiculo.id}`)
        .then(() => {
          const index = this.veiculos.findIndex(v => v.id === veiculo.id);
          if (index !== -1) {
            this.veiculos.splice(index, 1);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    ativarModoCadastro() {
      this.modoCadastro = true;
    },
    cancelarCadastro() {
      this.novoVeiculo.placa = '';
      this.novoVeiculo.modelo = '';
      this.novoVeiculo.cor = '';
      this.novoVeiculo.tipo = '';
      this.novoVeiculo.anoModelo = '';
      this.modoCadastro = false;
    },
    cancelarEdicao() {
      this.veiculoEdicao.id = '';
      this.veiculoEdicao.placa = '';
      this.veiculoEdicao.modelo = '';
      this.veiculoEdicao.cor = '';
      this.veiculoEdicao.tipo = '';
      this.veiculoEdicao.anoModelo = '';
      this.modoEdicao = false;
    }
  }
};
</script>

<style>
.custom-header {
  background-color: #f5f5f5;
  font-weight: bold;
}
</style>
