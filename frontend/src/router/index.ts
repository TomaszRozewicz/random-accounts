import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'contracts',
    component: () => import('../pages/PageIndex.vue')
  },
  {
    path: '/contracts/:id',
    name: 'contract',
    component: () => import('../pages/PageContract.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'bad-not-found',
    component: () => import('../pages/PageNotFound.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
