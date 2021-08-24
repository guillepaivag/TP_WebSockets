<template>
    <div>

        <div class="card mb-3" style="max-width: 100%;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="img" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">
                            {{ titulo }}
                        </h5>
                        <p class="card-text">
                            {{ descripcion }}
                        </p>
                        <p class="card-text">
                            <small class="text-muted">
                                Cantidad de camas {{ cantidadCamas }}. - Cantidad de pacientes {{ cantidadPacientes }}.
                            </small>
                        </p>
                        <hr>
                        <router-link
                            class="btn btn-outline-primary" 
                            :to="{ name: 'Hospital', params: { idNumero }}"
                        >
                            Ver hospital
                        </router-link>
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
            linkCuerpo: '/hospital'
        }
    },
    props: {
        img: String,
        titulo: String,
        descripcion: String,
        cantidadPacientes: Number,
        cantidadCamas: Number,
        idNumero: String
    },
    methods: {
        
    },
    computed: {
        linkHospital: function ( ) {
            return `${this.linkCuerpo}/${this.idNumero}`
        }
    }
}
</script>

<style>
.containerImg {
  height: 200px;
}

img {
    max-height: 100%;
}
</style>