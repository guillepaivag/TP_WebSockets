<template>
    <div>

        <div class="container" v-if="!getCargando">
            <div class="row mt-4"> 
                <div class="col-md-8 p-4 card">
                    <button class="btn btn-primary mt-1" type="button" data-bs-toggle="modal" data-bs-target="#agregarCama">
                        Agregar cama
                    </button>

                    <hr with="70%">

                    <bar-chart :chartdata="chartdata" :options="options" />
                </div>
                <div class="col-md-4">
                    <div v-if="miListaCamas.length > 0">
                        <h3> Lista de camas </h3>

                        <div class="mt-3">
                            <cartaCama 
                                v-for="(cama, index) in miListaCamas" :key="index" 
                                :camaID="cama.camaID"
                                :estado="cama.estado"
                            />
                        </div>
                    </div> 
                    <div v-else>
                        No hay camas
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <cargando />
        </div>

        <div class="modal fade" id="agregarCama" tabindex="-1" aria-labelledby="agregarCamaLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="agregarCamaLabel">Agregar Cama UTI</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mx-auto">
                        
                        <p>Número de hospital: {{ idNumero }}</p>

                        <p>Estado: Desocupado</p>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="cerrarModal" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" v-on:click="guardarCama" data-bs-dismiss="modal">Guardar cama</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cartaCama from '@/components/CartaCama.vue'
import cargando from '@/components/Cargando.vue'
import { mapGetters, mapMutations } from 'vuex'
import BarChart from '../components/grafica/BarChart.js'

export default {
    data() {
        return {
            miListaCamas: [],
            idNumero: '',
            chartdata: {
                datasets: [
                    {
                        label: 'Ocupado',
                        backgroundColor: '#f87979',
                        data: [0]
                    },
                    {
                        label: 'Desocupado',
                        backgroundColor: '#7860D1',
                        data: [0]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            beginAtZero: true
                        }
                    }]
                }
            }
        }
    },
    components: {
        cartaCama,
        cargando,
        BarChart
    },
    methods: {
        ...mapMutations(['setCargando']),
        guardarCama() {
            console.log('this.idNumero', this.idNumero)

            this.$socket.emit('operacion', {
                tipo_operacion: 2,
                datos: {
                    uidHospital: this.idNumero
                }
            })
        },
        getCamasOcupadas () {
            return this.miListaCamas.filter(cama => cama.estado == true)
        },
        getCamasDesocupadas () {
            return this.miListaCamas.filter(cama => cama.estado == false)
        },
        actualizarGrafica () {
            this.chartdata.datasets[0].data[0] = this.getCamasOcupadas().length
            this.chartdata.datasets[1].data[0] = this.getCamasDesocupadas().length
        },
    },
    sockets: {
        connect: function () {
            console.log('socket connected')
        },
        responseServer_camaCreada: function (data) {
            console.log('responseServer_camaCreada: ', data)
            const { respuesta } = data
            
            console.log('respuesta', respuesta)

            if (respuesta.uidHospital == this.idNumero) {
                this.miListaCamas.push(respuesta.cama)

                this.actualizarGrafica()
            }
        },
        responseServer_camaOcupada: function (data) {
            console.log('responseServer_camaOcupada: ', data)
            const { respuesta } = data
            
            console.log('respuesta', respuesta)

            if (respuesta.uidHospital == this.idNumero) {

                const index = this.miListaCamas.findIndex((cama) => {
                    return cama.camaID == respuesta.cama.camaID
                })

                this.miListaCamas[index].estado = true

                this.actualizarGrafica()
            }
        },
        responseServer_camaDesocupada: function (data) {
            console.log('responseServer_camaDesocupada: ', data)
            const { respuesta } = data
            
            console.log('respuesta', respuesta)

            if (respuesta.uidHospital == this.idNumero) {
                
                const index = this.miListaCamas.findIndex((cama) => {
                    return cama.camaID == respuesta.cama.camaID
                })

                this.miListaCamas[index].estado = false

                this.actualizarGrafica()
            }
        },
        responseServer_camaEliminada: function (data) {
            console.log('responseServer_camaEliminada: ', data)
            const { respuesta } = data
            
            console.log('respuesta', respuesta)

            if (respuesta.uidHospital == this.idNumero) {
                
                const index = this.miListaCamas.findIndex((cama) => {
                    return cama.camaID == respuesta.cama.camaID
                })

                this.miListaCamas.splice(index, 1)

                this.actualizarGrafica()
            }
        },
        responseServer_listaCamas: function (data) {
            console.log('responseServer_listaCamas: ', data)
            const { respuesta } = data
            
            console.log('respuesta lista', respuesta)

            this.miListaCamas = respuesta
            this.actualizarGrafica()
            this.setCargando(false)
        },
    },
    computed: {
        ...mapGetters(['getListaHospitales', 'getCargando']),
    },
    mounted() {
        this.setCargando(true)
        this.idNumero = this.$route.params.idNumero

        this.$socket.emit('operacion', {
            tipo_operacion: 7,
            datos: {
                uidHospital: this.idNumero
            }
        })
    },
}
</script>

<style>

</style>