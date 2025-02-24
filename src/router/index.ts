import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/vegetation',
    name: 'vegetation',
    component: () => import('../views/Vegetation.vue')
  },
  {
    path: '/soil',
    name: 'soil',
    component: () => import('../views/Soil.vue')
  },
  {
    path: '/pests',
    name: 'pests',
    component: () => import('../views/Pests.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 