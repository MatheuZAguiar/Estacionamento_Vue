<template>
  <nav>
    <router-link to="/movimentacao">Movimentação</router-link> |
    <router-link to="/condutor">Condutor</router-link> |
    <router-link to="/configuracao">Configuração</router-link> | 
    <router-link to="/marca">Marca</router-link> |
    <router-link to="/modelo">Modelo</router-link> |
    <router-link to="/veiculo">Veiculo</router-link>
  </nav>
  <router-view/>  
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
