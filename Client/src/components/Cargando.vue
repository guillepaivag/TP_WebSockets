<template>
    <div class="posicionPadre">
        <div class="posicioHijo">
            <div class="spinner-grow text-dark" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.posicionPadre {
    display: flex;
    justify-content: center;
    align-items: center;
}
.posicioHijo {
    margin-top: 250px;
}
</style>