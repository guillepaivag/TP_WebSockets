<template>
    <div>
        <div class="card border-primary mb-3" style="max-width: 100%;">
            <div class="card-header"> Cama: {{ camaID }} </div>
            <div class="card-body text-primary">
                <p class="card-text">
                    <small class="text-muted">
                        Estado: {{ estado ? 'Ocupado' : 'Desocupado' }}
                    </small>
                </p>
            
                <hr>

                <router-link
                    class="btn btn-outline-primary" 
                    :to="{ name: 'Cama', params: { camaID }}"
                >
                    Ver cama
                </router-link>
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
        camaID: String,
        estado: Boolean
    }
}
</script>

<style>

</style>