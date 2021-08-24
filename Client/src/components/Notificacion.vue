<template>
    <div class="notification-list">
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <img src="https://origenarts.com/wp-content/uploads/2018/01/azul-google-material-design.png" width="20px" class="rounded me-2" alt="...">
                <strong class="me-auto">
                    Operación: {{ mensaje.tipo_operacion }}
                </strong>
                <small>
                    Estado: {{ mensaje.estado }}
                </small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ mensaje.mensaje }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mensajeObjet: {}
        }
    },
    props: {
        mensaje: Object
    },
    watch: {
        mensaje: function (n, v){
            this.mensajeObjet = n
        }
    },
    mounted() {
        this.mensajeObjet = this.mensaje
    },
}
</script>

<style>
.notification-list {
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 15px;
    width: 320px;
}

@media (max-width: 350px) { 

    .notification-list {
        max-width: 295px;
    }

}

@media (max-width: 320px) { 

    .notification-list {
        max-width: 265px;
    }

}

@media (max-width: 285px) { 

    .notification-list {
        max-width: 225px;
    }

}
</style>