const admin = require('../../firebase-service')
const db = admin.firestore()

class CamaUTI {
    
    /* CONSTRUCTOR */
    constructor ( camaID = '' , estado = false ) {
        this.camaID = camaID
        this.estado = estado
    }

    /* GETTERS */
    getEstado () {
        return this.estado
    }

    getCamaID () {
        return this.camaID
    }
    

    /* SETTERS */
    setEstado (estado) {
        this.estado = estado
    }

    setCamaID (camaID) {
        this.camaID = camaID
    }

    /* ACTIONS */

    //Eliminar Cama UTI 
    async eliminarCama (hospitalID) {
        await db.collection("Hospitales").doc(hospitalID).collection("CamasUTI").doc(this.camaID).delete()

        return true
    }

    //Ocupar Cama UTI
    async ocuparCama (hospitalID) {
        await db.collection("Hospitales").doc(hospitalID).collection("CamasUTI").doc(this.camaID).update({
            estado: true
        })

        this.estado = true

        return true
    }

    //Desocupar Cama UTI
    async desocuparCama (hospitalID) {
        await db.collection("Hospitales").doc(hospitalID).collection("CamasUTI").doc(this.camaID).update({
            estado: false
        })

        this.estado = false

        return true
    }
}

module.exports = CamaUTI