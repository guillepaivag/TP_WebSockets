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

    async importarDatosDeCamaUTI (hospitalID, camaID) {
        const camaDoc = await db.collection("Hospitales").doc(hospitalID).collection("CamasUTI").doc(camaID).get()

        if (!camaDoc.exists) {
            return null
        }

        this.setCamaID(camaDoc.data().camaID)
        this.setEstado(camaDoc.data().estado)

        return this
    }

    //Eliminar Cama UTI 
    async eliminarCama (hospitalID) {
        const hospitalRef = db.collection("Hospitales").doc(hospitalID)
        
        const camaDoc = await db.collection("Hospitales").doc(hospitalID).collection("CamasUTI").doc(this.camaID).get()

        if (!camaDoc.exists) {
            throw new Error(`No existe la cama ${this.camaID}.`)
        }

        const cama = camaDoc.data()

        if (cama.estado) {
            return false
        }
        
        await db.collection("Hospitales").doc(hospitalID).collection("CamasUTI").doc(this.camaID).delete()

        const hospitalData = (await hospitalRef.get()).data()
        await hospitalRef.update({
            cantidadCamas: hospitalData.cantidadCamas - 1
        })

        return true
    }

    //Ocupar Cama UTI
    async ocuparCama (hospitalID) {
        const hospitalRef = db.collection("Hospitales").doc(hospitalID)

        const camaDoc = await db.collection("Hospitales").doc(hospitalID).collection("CamasUTI").doc(this.camaID).get()

        if (!camaDoc.exists) {
            throw new Error(`No existe la cama ${this.camaID}.`)
        }

        const cama = camaDoc.data()

        if (cama.estado) {
            return false
        }
        
        await db.collection("Hospitales").doc(hospitalID).collection("CamasUTI").doc(this.camaID).update({
            estado: true
        })

        const hospitalData = (await hospitalRef.get()).data()
        await hospitalRef.update({
            cantidadPacientes: hospitalData.cantidadPacientes + 1
        })

        this.estado = true

        return true
    }

    //Desocupar Cama UTI
    async desocuparCama (hospitalID) {
        const hospitalRef = db.collection("Hospitales").doc(hospitalID)

        const camaDoc = await db.collection("Hospitales").doc(hospitalID).collection("CamasUTI").doc(this.camaID).get()

        if (!camaDoc.exists) {
            throw new Error(`No existe la cama ${this.camaID}.`)
        }

        const cama = camaDoc.data()

        if (!cama.estado) {
            return false
        }
        
        await db.collection("Hospitales").doc(hospitalID).collection("CamasUTI").doc(this.camaID).update({
            estado: false
        })

        const hospitalData = (await hospitalRef.get()).data()
        await hospitalRef.update({
            cantidadPacientes: hospitalData.cantidadPacientes - 1
        })

        this.estado = false

        return true
    }
}

module.exports = CamaUTI