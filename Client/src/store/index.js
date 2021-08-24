import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import hospital from './modules/hospital'

export default new Vuex.Store({
  state: {
    cargando: true,
    mensaje: null
  },
  mutations: {
    setCargando(state, cargando) {
      state.cargando = cargando
    },
    setMensaje (state, mensaje) {
      state.mensaje = mensaje

      setTimeout(() => {
        state.mensaje = null
      }, 5000);
    }
  },
  actions: {
    SOCKET_responseServer_problemSystem ({ commit }, data) {
      commit('setMensaje', {
        estado: data.estado,
        mensaje: data.mensaje,
        tipo_operacion: data.tipo_operacion,
        respuesta: data.respuesta
      })
    }
  },
  getters: {
    getCargando (state) {
      return state.cargando
    },
    getMensaje (state) {
      return state.mensaje
    }
  },
  modules: {
    hospital
  }
})
