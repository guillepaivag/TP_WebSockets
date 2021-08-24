<template>
  <div id="app">
    <navegation />
    
    <router-view/>

    <div v-if="getMensaje">
      <notificacion :mensaje="getMensaje" />
    </div>
  </div>
</template>

<script>
import navegation from '@/components/navegation'
import notificacion from '@/components/Notificacion'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    navegation,
    notificacion
  },
  computed: {
    ...mapGetters(['getMensaje'])
  }
}
</script>

<style>
/* @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"); */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
