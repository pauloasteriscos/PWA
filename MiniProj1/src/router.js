import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import QuemSouEu from './pages/Pag1.vue'
import OQueFaco from './pages/Pag2.vue'
import Hobbies from './pages/Pag3.vue'

// Detecta se está a correr localmente (ex: file://)
const isLocal = window.location.protocol === 'file:'

// Usa hash no modo local, e history no deploy (Vercel, Azure, etc.)
const router = createRouter({
  history: isLocal ? createWebHashHistory() : createWebHistory(),
  routes: [
    { path: '/', component: QuemSouEu },
    { path: '/oque-faco', component: OQueFaco },
    { path: '/hobbies', component: Hobbies },
  ]
})

export default router
