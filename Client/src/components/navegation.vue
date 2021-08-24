<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <router-link class="navbar-brand" to="/">Camas UTI</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link class="nav-link" aria-current="page" to="/estado">
                                Ver estado
                            </router-link>
                        </li>
                        <!-- <li class="nav-item ListBtnAddCamaUTI">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Agregar cama
                            </button>
                        </li> -->
                    </ul>
                </div>

                <!-- <button type="button" class="btn btn-primary btnAddCamaUTI" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Agregar cama
                </button> -->
            </div>
        </nav>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Agregar Cama UTI</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mx-auto">
                        
                        <select class="form-select mt-2" v-model="idNumero" aria-label="Default select example">
                            <option value="0" selected>Número de hospital</option>
                            <option value="1"> 1 </option>
                            <option value="2"> 2 </option>
                            <option value="3"> 3 </option>
                        </select>

                        <select class="form-select mt-4" v-model="estado" aria-label="Default select example">
                            <option value="" selected>Seleccione un estado</option>
                            <option value="true">Ocupado</option>
                            <option value="false">Desocupado</option>
                        </select>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" v-on:click="guardarCama">Guardar cama</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            idNumero: 0,
            estado: ''
        }
    },
    methods: {
        guardarCama() {
            console.log('idNumero', this.idNumero)
            console.log('estado', this.estado)
        }
    },
}
</script>

<style>

@media screen and (max-width: 991px) {
    .btnAddCamaUTI {
        display: none;
    }
}

@media screen and (min-width: 991px) {
    .ListBtnAddCamaUTI {
        display: none;
    }
}

</style>