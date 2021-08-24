import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const DEFAULT_TITLE = 'Camas UTI'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Inicio'
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/hospital/:idNumero',
    name: 'Hospital',
    meta: {
      title: 'Hospital'
    },
    component: () => import('../views/Hospital.vue')
  },
  {
    path: '/hospital/:idNumero/cama/:camaID',
    name: 'Cama',
    meta: {
      title: 'Cama UTI'
    },
    component: () => import('../views/Cama.vue')
  },
  {
    path: '/estado',
    name: 'Estado',
    meta: {
      title: 'Estado'
    },
    component: () => import('../views/Estado.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to, from) => {

  console.log(from)
  
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE
  })
  
})

export default router
