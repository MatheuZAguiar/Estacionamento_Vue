<template>
  <div class="marca">
    <h1 class="text-center">MARCA</h1>
    <!-- Botão de cadastro -->
    <div class="col-12 d-flex justify-content-end">
      <div class="col-2">
        <button class="btn btn-success" @click="ativarModoCadastro">Nova Marca</button>
      </div>
    </div>

    <div class="row justify-content-center">

      <div class="col-12">
        <table class="table table-striped">
          <thead>
            <tr class="custom-header">
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="marca in marcas" :key="marca.id">
              <td>{{ marca.id }}</td>
              <td>{{ marca.nomeMarca }}</td>
              <td>
                <button class="btn btn-primary" @click="editarMarca(marca)">Editar</button>
                <button class="btn btn-danger" @click="excluirMarca(marca)">Excluir</button>
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
          <h2>{{ modoEdicao ? 'Editar' : 'Cadastro' }} de Marca</h2>
          <form @submit.prevent="modoEdicao ? atualizarMarca() : adicionarMarca()">
            <div class="form-group">
              <label for="nomeMarca">Nome:</label>
              <input v-model="novaMarca.nomeMarca" type="text" class="form-control" id="nomeMarca" required>
            </div>
            <button type="submit" class="btn btn-success">{{ modoEdicao ? 'Atualizar' : 'Salvar' }}</button>
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
  name: 'Marca',
  data() {
    return {
      marcas: [],
      modoCadastro: false,
      modoEdicao: false,
      novaMarca: {
        id: null,
        nomeMarca: '',
      },
    };
  },
  mounted() {
    this.carregarMarcas();
  },
  methods: {
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
    editarMarca(marca) {
      this.novaMarca = { ...marca };
      this.modoCadastro = true;
      this.modoEdicao = true;
    },
    excluirMarca(marca) {
      if (confirm('Deseja excluir a marca?')) {
        axios
          .delete(`http://localhost:8080/api/marca/${marca.id}`)
          .then((response) => {
            console.log('Marca excluída:', response.data);
            this.carregarMarcas();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    ativarModoCadastro() {
      this.modoCadastro = true;
      this.modoEdicao = false;
      this.resetarNovaMarca();
    },
    cancelarCadastro() {
      this.modoCadastro = false;
      this.modoEdicao = false;
      this.resetarNovaMarca();
    },
    resetarNovaMarca() {
      this.novaMarca = {
        id: null,
        nomeMarca: '',
      };
    },
    adicionarMarca() {
      axios
        .post('http://localhost:8080/api/marca', this.novaMarca)
        .then((response) => {
          console.log('Marca adicionada:', response.data);
          this.carregarMarcas();
          this.cancelarCadastro();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    atualizarMarca() {
      axios
        .put(`http://localhost:8080/api/marca/${this.novaMarca.id}`, this.novaMarca)
        .then((response) => {
          console.log('Marca atualizada:', response.data);
          this.carregarMarcas();
          this.cancelarCadastro();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
  .marca {
    margin: 20px;
  }

  .text-center {
    text-align: center;
  }

  .custom-header {
    background-color: #f2f2f2;
  }

  .btn {
    margin-right: 10px;
  }

  .row {
    margin-bottom: 10px;
  }

  .form-group {
    margin-bottom: 10px;
  }
</style>