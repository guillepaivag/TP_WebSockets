<template>
    <div class="home">
      <section class="py-4 text-center container">
        <div class="row py-lg-2">
          <div class="col-lg-4 col-md-8 mx-auto">
            
            <h3> Lista de hospitales </h3>
            
          </div>
        </div>
      </section>

      <div class="container" v-if="!getCargando">

        <div v-if="miListaHospitales.length > 0"> 
          <cartaHospital 
            v-for="(hospital, index) in miListaHospitales" :key="index" 
            :idNumero="hospital.idNumero"
            :titulo="hospital.nombre"
            :descripcion="hospital.descripcion"
            :img="hospital.foto"
            :cantidadCamas="hospital.cantidadCamas"
            :cantidadPacientes="hospital.cantidadPacientes"
          />
        </div>
        <p v-else>
          No hay hospitales
        </p>
        
      </div>

      <div v-else>
        <cargando />
      </div>

  </div>
</template>

<script>
import cartaHospital from '@/components/inicio/CartaHospital.vue'
import cargando from '@/components/Cargando.vue'
import { mapGetters, mapMutations } from 'vuex'

const objetoGigante = {
  name: 'Home',
  components: {
    cartaHospital,
    cargando
  },
  data() {
    return {
      miListaHospitales: []
    }
  },
  methods: {
    ...mapMutations(['setCargando'])
  },
  computed: {
    ...mapGetters(['getListaHospitales', 'getCargando']),
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    responseServer_listaHospitales: function (data) {
      console.log('responseServer_listaHospitales: ', data)
      const { respuesta } = data
      
      this.miListaHospitales = respuesta
      this.setCargando(false)
    }
  },
  async created() {

    this.setCargando(true)

    this.$socket.emit('operacion', {
      tipo_operacion: 6,
    })

  },
}

export default objetoGigante
</script>
