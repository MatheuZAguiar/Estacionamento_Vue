<template>
  <div class="modelo">
    <h1 class="text-center">MODELO</h1>
    <!-- Botão de cadastro -->
    <div class="col-12 d-flex justify-content-end">
      <div class="col-2">
        <button class="btn btn-success" @click="ativarModoCadastro">Novo Modelo</button>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-12">
        <table class="table table-striped">
          <thead>
            <tr class="custom-header">
              <th>ID</th>
              <th>Nome do Modelo</th>
              <th>Marca</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
  <tr v-for="modelo in modelos" :key="modelo.id">
    <td>{{ modelo.id }}</td>
    <td>{{ modelo.nomeModelo }}</td>
    <td>{{ modelo.marca.nomeMarca }}</td>
    <td>
      <button class="btn btn-primary" @click="editarModelo(modelo)">Editar</button>
      <button class="btn btn-danger" @click="excluirModelo(modelo)">Excluir</button>
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
          <h2>{{ modoEdicao ? 'Editar' : 'Cadastro' }} de Modelo</h2>
          <form @submit.prevent="modoEdicao ? atualizarModelo() : adicionarModelo()">

            <div class="form-group">
              <label for="nomeModelo">Nome do Modelo:</label>
              <input v-model="novoModelo.nomeModelo" type="text" class="form-control" id="nomeModelo" required>
            </div>
            <div class="form-group">
              <label for="marca">Marca:</label>
              <select v-model="novoModelo.marca" class="form-control" id="marca" required>
                <option v-for="marca in marcas" :key="marca.id" :value="marca">{{ marca.nomeMarca }}</option>
              </select>
            </div>
            <button type="submit" class="btn btn-success">{{ modoEdicao ? 'Atualizar' : 'Salvar' }}</button>
            <button class="btn btn-secondary" @click="cancelarCadastro">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Estilos personalizados aqui */
</style>

<script>
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

export default {
  name: 'Modelo',
  data() {
    return {
      modelos: [],
      marcas: [],
      modoCadastro: false,
      modoEdicao: false,
      novoModelo: {
  id: null,
  nomeModelo: '',
  marca: {
    id: null,
    nomeMarca: '',
  },
},
    };
  },
  mounted() {
    this.carregarModelos();
    this.carregarMarcas();
  },
  methods: {
    carregarModelos() {
      axios
        .get('http://localhost:8080/api/modelo')
        .then((response) => {
          this.modelos = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    carregarMarcas() {
      axios
        .get('http://localhost:8080/api/marca')
        .then((response) => {
          this.marcas = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    editarModelo(modelo) {
      this.novoModelo = { ...modelo };
      this.modoCadastro = true;
      this.modoEdicao = true;
    },
    excluirModelo(modelo) {
      if (confirm('Deseja excluir o modelo?')) {
        axios
          .delete(`http://localhost:8080/api/modelo/${modelo.id}`)
          .then((response) => {
            console.log('Modelo excluído:', response.data);
            this.carregarModelos();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    ativarModoCadastro() {
      this.modoCadastro = true;
      this.modoEdicao = false;
      this.resetarNovoModelo();
    },
    cancelarCadastro() {
      this.modoCadastro = false;
      this.modoEdicao = false;
      this.resetarNovoModelo();
    },
    resetarNovoModelo() {
  this.novoModelo = {
    id: null,
    nomeModelo: '',
    marca: {
      id: null,
      nomeMarca: '',
    },
  };
},
    adicionarModelo() {
      axios
        .post('http://localhost:8080/api/modelo', this.novoModelo)
        .then((response) => {
          console.log('Modelo adicionado:', response.data);
          this.carregarModelos();
          this.cancelarCadastro();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    atualizarModelo() {
      axios
        .put(`http://localhost:8080/api/modelo/${this.novoModelo.id}`, this.novoModelo)
        .then((response) => {
          console.log('Modelo atualizado:', response.data);
          this.carregarModelos();
          this.cancelarCadastro();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
