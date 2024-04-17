import { createRouter, createWebHistory } from 'vue-router';
import HouseView from '../views/HouseView.vue';
import TenantView from '../views/TenantView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HouseView
    },
    {
      path: '/tenants',
      name: 'tenants',
      component: TenantView
    }
  ]
})

export default router
