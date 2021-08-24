import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueSocketIO from 'vue-socket.io'
import SocketIOClient from 'socket.io-client'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


const stringServer = process.env.NODE_ENV === 'production' ? 'https://camasuti.herokuapp.com' : 'http://localhost:1605'

axios.defaults.baseURL = `${stringServer}/api`

export const SocketIO = SocketIOClient(stringServer, {
  withCredentials: true,
})

const VueSIO = new VueSocketIO({
  debug: false,
  connection: SocketIO,
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  }
})

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

Vue.use(VueSIO)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')