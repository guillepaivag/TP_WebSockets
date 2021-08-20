const admin = require('../../firebase-service')
const db = admin.firestore()

const COLLECTION_REGISTROACTIVIDAD = 'RegistroActividad'

class RegistroActividad {
    
    constructor ( hospital, cama, tipo_operacion, fechaHora = new Date() ) {
        this.hospital = hospital
        this.cama = cama
        this.tipo_operacion = tipo_operacion
        this.fechaHora = fechaHora
    }

    /* GETTERS */
    getFechaHora () {
        return this.fechaHora
    }

    getHospital () {
        return this.hospital
    }

    getCama () {
        return this.cama
    }

    getTipoOperacion () {
        return this.tipo_operacion
    }


    /* SETTERS */
    setFechaHora (fechaHora) {
        this.fechaHora = fechaHora
    }

    setHospital (hospital) {
        this.hospital = hospital
    }

    setCama (cama) {
        this.cama = cama
    }

    setTipoOperacion (tipo_operacion) {
        this.tipo_operacion = tipo_operacion
    }

    /* ACTIONS */
    async guardarRegistroActividad () {
        const registroActividad = {
            fechaHora: admin.firestore.Timestamp.fromDate(this.fechaHora),
            hospital: this.hospital,
            cama: this.cama,
            tipo_operacion: this.tipo_operacion
        }

        const uidRegistroActividad = (await db.collection(COLLECTION_REGISTROACTIVIDAD).add(registroActividad)).id

        return uidRegistroActividad
    }
}

module.exports = RegistroActividad