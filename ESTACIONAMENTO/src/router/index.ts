import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CondutorView from '../views/CondutorView.vue';
import ConfiguracaoView from '../views/ConfiguracaoView.vue';
import MarcaView from '../views/MarcaView.vue';
import ModeloView from '../views/ModeloView.vue';
import MovimentacaoView from '../views/MovimentacaoView.vue';
import VeiculoView from '../views/VeiculoView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/condutor',
    name: 'condutor',
    component: CondutorView
  },
  {
    path: '/configuracao',
    name: 'configuracao',
    component: ConfiguracaoView
  },
  {
    path: '/marca',
    name: 'marca',
    component: MarcaView
  },
  {
    path: '/modelo',
    name: 'modelo',
    component: ModeloView
  },
  {
    path: '/movimentacao',
    name: 'movimentacao',
    component: MovimentacaoView
  },
  {
    path: '/veiculo',
    name: 'veiculo',
    component: VeiculoView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
