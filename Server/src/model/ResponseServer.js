class ResponseServer {
    
    constructor ( data ) {
        const { estado, mensaje, tipo_operacion, respuesta } = data
    
        this.estado = estado
        this.mensaje = mensaje
        this.tipo_operacion = tipo_operacion
        this.respuesta = respuesta
    }




    /* SETTERS */
    setEstado ( estado ) {
        this.estado = estado
    }

    setMensaje ( mensaje ) {
        this.mensaje = mensaje
    }

    setTipoOperacion ( tipo_operacion ) {
        this.tipo_operacion = tipo_operacion
    }

    setRespuesta ( respuesta ) {
        this.respuesta = respuesta
    }




    /* GETTERS */
    getResponseServer () {
        return {
            estado: this.estado,
            mensaje: this.mensaje,
            tipo_operacion: this.tipo_operacion,
            respuesta: this.respuesta
        }
    }
}

module.exports = ResponseServer