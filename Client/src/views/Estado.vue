<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-xl-2">
                <div class="list-group" id="list-tab" role="tablist">
                    <a 
                        v-for="(item, index) in listaIdHospitales" :key="index"
                        class="list-group-item list-group-item-action" 
                        :class="item.class" 
                        :id="item.id" 
                        data-bs-toggle="list" 
                        :href="item.href" 
                        role="tab" 
                        :aria-controls="item.ariaControls"
                    >
                        {{ item.title }}
                    </a>
                    <!-- <a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">Profile</a>
                    <a class="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">Messages</a>
                    <a class="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list" href="#list-settings" role="tab" aria-controls="list-settings">Settings</a>` -->
                </div>
            </div>
            <div class="col-xl-10">
                <div class="tab-content mt-3" id="nav-tabContent">
                    <div 
                        v-for="(item, index) in listaDatosHospitalCamas" :key="index"
                        class="tab-pane fade" 
                        :class="item.component.class" 
                        :id="item.component.id" 
                        role="tabpanel" 
                        :aria-labelledby="item.component.ariaLabelledby"
                    >
                        <cartaHospitalCamas :hospital="item.hospital" />
                    </div>
                    <!-- <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">..2.</div>
                    <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                    <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cartaHospitalCamas from '@/components/CartaHospitalCamas'

export default {
    name: '',
    data() {
        return {
            listaIdHospitales: [],
            listaDatosHospitalCamas: []
        }
    },
    components: {
        cartaHospitalCamas
    },
    methods: {
        contructorDeEstado_listaIdHospitales (respuesta) {
            this.listaIdHospitales = []
            
            for (let i = 0; i < respuesta.length; i++) {
                const element = respuesta[i];
                
                const datos = {
                    class: '',
                    id: `hospital-id-${element.idNumero}`,
                    href: `#hospital-${element.idNumero}`,
                    ariaControls: `hospital-${element.idNumero}`,
                    title: `Hospital ${element.idNumero}`
                }

                if (i === 0) {
                    datos.class = 'active'
                }

                this.listaIdHospitales.push(datos)
            }
        },
        contructorDeEstado_listaDatosHospitalCamas (respuesta) {
            this.listaDatosHospitalCamas = []
            
            for (let i = 0; i < respuesta.length; i++) {
                const element = respuesta[i];
                
                const datos = {
                    component: {
                        class: '',
                        id: `hospital-${element.idNumero}`,
                        ariaLabelledby: `hospital-id-${element.idNumero}`
                    },
                    hospital: element
                }

                if (i === 0) {
                    datos.component.class = 'show active'
                }

                this.listaDatosHospitalCamas.push(datos)

            }
        }
    },
    sockets: {
        connect: function () {
            console.log('socket connected')
        },
        responseServer_verEstado: function (data) {
            console.log('responseServer_verEstado: ', data)
            const { respuesta } = data

            this.contructorDeEstado_listaIdHospitales(respuesta)
            this.contructorDeEstado_listaDatosHospitalCamas(respuesta)
        },
    },
    async created() {
        this.$socket.emit('operacion', {
            tipo_operacion: 1,
        })
    },
}
</script>

<style>

</style>