<template>
  <div class="condutor">
    <h1 class=" text-center">CONDUTOR</h1>
        <!-- Botão de cadastro -->
    <div class="col-12 d-flex justify-content-end">
      <div class="col-2">
        <button class="btn btn-success" @click="ativarModoCadastro">Novo Condutor</button>
      </div>
    </div>
    
    <div class="row justify-content-center">
      
      <div class="col-12">
        <table class="table table-striped">
          <thead>
            <tr class="custom-header">
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Tempo de Desconto</th>
              <th>Tempo Pago</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody >
            <tr v-for="condutor in condutores" :key="condutor.id">
              <td>{{ condutor.id }}</td>
              <td>{{ condutor.nomeCondutor }}</td>
              <td>{{ condutor.cpf }}</td>
              <td>{{ condutor.telefone }}</td>
              <td>{{ condutor.tempoDesconto }}</td>
              <td>{{ condutor.tempoPago }}</td>
              <td>
                <button class="btn btn-primary" @click="editarCondutor(condutor)">Editar</button>
                <button class="btn btn-danger" @click="excluirCondutor(condutor)">Excluir</button>
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
          <h2>Cadastro de Condutor</h2>
          <form @submit.prevent="adicionarCondutor">
            <div class="form-group">
              <label for="nomeCondutor">Nome:</label>
              <input v-model="novoCondutor.nomeCondutor" type="text" class="form-control" id="nomeCondutor" required>
            </div>
            <div class="form-group">
              <label for="cpf">CPF:</label>
              <input v-model="novoCondutor.cpf" type="text" class="form-control" id="cpf" required>
            </div>
            <div class="form-group">
              <label for="telefone">Telefone:</label>
              <input v-model="novoCondutor.telefone" type="text" class="form-control" id="telefone" required>
            </div>
            <div class="form-group">
              <label for="tempoDesconto">Tempo de Desconto:</label>
              <input v-model="novoCondutor.tempoDesconto" type="time" class="form-control" id="tempoDesconto">
            </div>
            <div class="form-group">
              <label for="tempoPago">Tempo Pago:</label>
              <input v-model="novoCondutor.tempoPago" type="time" class="form-control" id="tempoPago">
            </div>
            <button type="submit" class="btn btn-success">Salvar</button>
            <button class="btn btn-secondary" @click="cancelarCadastro">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>

<script>
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

export default {
  name: 'Condutor',
  data() {
    return {
      condutores: [],
      modoCadastro: false,
      novoCondutor: {
        id: null,
        nomeCondutor: '',
        cpf: '',
        telefone: '',
        tempoDesconto: null,
        tempoPago: null,
      },
    };
  },
  mounted() {
    this.carregarCondutores();
  },
  methods: {
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
    editarCondutor(condutor) {
      this.novoCondutor = { ...condutor };
      this.modoCadastro = true;
    },
    excluirCondutor(condutor) {
      if (confirm('Deseja excluir o condutor?')) {
        axios
          .delete(`http://localhost:8080/api/condutor/${condutor.id}`)
          .then((response) => {
            console.log('Condutor excluído:', response.data);
            this.carregarCondutores();
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
      this.resetarNovoCondutor();
    },
    resetarNovoCondutor() {
      this.novoCondutor = {
        id: null,
        nomeCondutor: '',
        cpf: '',
        telefone: '',
        tempoDesconto: null,
        tempoPago: null,
      };
    },
    adicionarCondutor() {
      if (this.novoCondutor.id) {
        // Editar condutor existente
        axios
          .put(`http://localhost:8080/api/condutor/${this.novoCondutor.id}`, this.novoCondutor)
          .then((response) => {
            console.log('Condutor atualizado:', response.data);
            this.carregarCondutores();
            this.cancelarCadastro();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // Adicionar novo condutor
        axios
          .post('http://localhost:8080/api/condutor', this.novoCondutor)
          .then((response) => {
            console.log('Condutor adicionado:', response.data);
            this.carregarCondutores();
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
