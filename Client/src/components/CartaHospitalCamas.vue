<template>
    <div class="container">

        <div class="card mb-3" style="max-width: 100%;">
            <div class="row g-0">
                <div class="col-md-4">
                <img :src="hospital.foto" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ hospital.idNumero }} - {{ hospital.nombre }}</h5>
                    <p class="card-text">
                        {{ hospital.descripcion }}
                    </p>
                    <p class="card-text"><small class="text-muted">
                        Cantidad de camas {{ hospital.cantidadCamas }}. - Cantidad de pacientes {{ hospital.cantidadPacientes }}.
                    </small></p>
                </div>
                </div>
            </div>
        </div>

        <hr>

        <div>
            <div v-for="(item, index) in hospital.lista_de_camas" :key="index" class="card border-primary mb-3"  style="max-width: 100%;">
                <div class="card-header"> Cama: {{ item.camaID }} </div>
                <div class="card-body text-primary">
                    <p class="card-text">
                        <small class="text-muted">
                            Estado: {{ item.estado ? 'Ocupado' : 'Desocupado' }}
                        </small>
                    </p>
                
                    <hr>

                    <div v-if="item.estado">
                        <div class="spinner-grow text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div v-else>
                        <div class="spinner-grow text-danger" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            
        }
    },
    props: {
        hospital: Object
    }
}
</script>

<style>

</style>