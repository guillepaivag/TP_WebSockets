<template>
    <div class="container">
        
        <div v-if="getCargando">
            <cargando />
        </div>

        <div v-else>
            <h3 class="mt-4">
                Cama: 
                <small class="text-primary">
                    {{ camaID }}
                </small>
            </h3>

            <h3 class="mt-4">
                Estado: 
                <small class="text-primary">
                    {{ estado ? 'Ocupado' : 'Desocupado' }}
                </small>
            </h3>

            <hr>

            <div class="row">
                <div class="col-md-4 d-grid gap-2">
                    <button type="button" class="btn btn-outline-success m-2" v-on:click="ocuparCama">Ocupar</button>
                </div>
                <div class="col-md-4 d-grid gap-2">
                    <button type="button" class="btn btn-outline-secondary m-2" v-on:click="desocuparCama">Desocupar</button>
                </div>
                <div class="col-md-4 d-grid gap-2">
                    <button type="button" class="btn btn-outline-danger m-2" data-bs-toggle="modal" data-bs-target="#confirmacionEliminacion" data-bs-whatever="@mdo">Eliminar</button>
                </div>
            </div>

            <hr>

            <div class="modal fade" id="confirmacionEliminacion" tabindex="-1" aria-labelledby="confirmacionEliminacionLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="confirmacionEliminacionLabel">Eliminación de una cama UTI</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Escriba la uid de la cama: {{ camaID }}</label>
                                    <input type="text" class="form-control" id="recipient-name" v-model="UIDConfirmacionEliminacion" placeholder="UID Cama">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-danger" v-if="UIDConfirmacionEliminacion === camaID" v-on:click="eliminarCama" data-bs-dismiss="modal">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import cargando from '@/components/Cargando.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: '',
    data() {
        return {
            idNumero: '',
            camaID: '',
            estado: false,
            UIDConfirmacionEliminacion: ''
        }
    },
    components: {
        cargando
    },
    sockets: {
        connect: function () {
            console.log('socket connected')
        },
        responseServer_datosCama: function (data) {
            console.log('responseServer_datosCama: ', data)
            const { respuesta } = data
            
            this.estado = respuesta.cama.estado

            this.setCargando(false)
        },
        responseServer_camaOcupada: function (data) {
            console.log('responseServer_camaOcupada: ', data)
            const { respuesta } = data
            
            this.estado = respuesta.cama.estado
        },
        responseServer_camaDesocupada: function (data) {
            console.log('responseServer_camaDesocupada: ', data)
            const { respuesta } = data
            
            this.estado = respuesta.cama.estado
        },
        responseServer_camaEliminada: function (data) {
            console.log('responseServer_camaEliminada: ', data)
            const { respuesta } = data
            
            this.$router.push({ 
                name: 'Hospital', 
                params: {
                    idNumero: this.idNumero
                }
            })
        },
    },
    methods: {
        ...mapMutations(['setCargando']),
        eliminarCama() {
            this.$socket.emit('operacion', {
                tipo_operacion: 3,
                datos: {
                    uidHospital: this.idNumero,
                    uidCamaUTI: this.camaID
                }
            })
        },
        ocuparCama() {
            this.$socket.emit('operacion', {
                tipo_operacion: 4,
                datos: {
                    uidHospital: this.idNumero,
                    uidCamaUTI: this.camaID
                }
            })
        },
        desocuparCama() {
            console.log('desocuparCama')

            this.$socket.emit('operacion', {
                tipo_operacion: 5,
                datos: {
                    uidHospital: this.idNumero,
                    uidCamaUTI: this.camaID
                }
            })
        },
    },
    computed: {
        ...mapGetters(['getCargando']),
    },
    mounted() {
        this.setCargando(true)
        
        this.camaID = this.$route.params.camaID
        this.idNumero = this.$route.params.idNumero
        
        this.$socket.emit('operacion', {
            tipo_operacion: 8,
            datos: {
                uidHospital: this.idNumero,
                uidCamaUTI: this.camaID
            }
        })
    },
}
</script>

<style>

</style>