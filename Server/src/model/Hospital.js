const admin = require('../../firebase-service')
const db = admin.firestore()
const CamaUTI = require('./CamaUTI')
const utilHospital = require('../utils/hospital')

class Hospital {
    
    /* CONSTRUCTOR */
    constructor ( idNumero, 
                nombre = '', 
                descripcion = '', 
                foto = '', 
                cantidadCamas = 0,
                cantidadPacientes = 0 ) 
    {
        this.idNumero = idNumero
        this.nombre = nombre
        this.descripcion = descripcion
        this.foto = foto
        this.cantidadCamas = cantidadCamas
        this.cantidadPacientes = cantidadPacientes
        this.lista_de_camas = []
    }

    /* GETTERS */
    getIdNumero () {
        return this.idNumero
    }

    getNombre () {
        return this.nombre
    }

    getDescripcion () {
        return this.descripcion
    }

    getFoto () {
        return this.foto
    }

    getCantidadCamas () {
        return this.cantidadCamas
    }

    getCantidadPacientes () {
        return this.cantidadPacientes
    }

    getListaDeCamas () {
        return this.lista_de_camas
    }



    /* SETTERS */
    setIdNumero ( idNumero ) {
        this.idNumero = idNumero
    }

    setNombre ( nombre ) {
        this.nombre = nombre
    }

    setDescripcion ( descripcion ) {
        this.descripcion = descripcion
    }

    setFoto ( foto ) {
        this.foto = foto
    }

    setCantidadCamas ( cantidadCamas ) {
        this.cantidadCamas = cantidadCamas
    }

    setCantidadPacientes ( cantidadPacientes ) {
        this.cantidadPacientes = cantidadPacientes
    }

    /* ACTIONS */

    async importarDatosHospital ( uidHospital ) {
        await this.setDatosHospital ( uidHospital )

        await this.setListaDatosCamas (  )

        return this
    }


    async setDatosHospital ( uidHospital ) {
        const hospitalDoc = await db.collection("Hospitales").doc(uidHospital).get()

        if ( !hospitalDoc.exists ) {
            throw "No existe el hospital"
        }

        this.idNumero = hospitalDoc.data().idNumero
        this.nombre = hospitalDoc.data().nombre
        this.descripcion = hospitalDoc.data().descripcion
        this.foto = hospitalDoc.data().foto
        this.cantidadCamas = hospitalDoc.data().cantidadCamas
        this.cantidadPacientes = hospitalDoc.data().cantidadPacientes
    }

    // selecciona la coleccion de hospitales 
    //const lista_de_camasDoc = await db.collection("Hospitales")
    // selecciona los datos de un hospital por su ID
    //const lista_de_camasDoc = await db.collection("Hospitales").doc(hospitalID)
    // selecciona la coleccion de camas de un hospital elejido por la ID
    //const lista_de_camasDoc = await db.collection("Hospitales").doc(hospitalID).collection("CamasUTI").get()
    async setListaDatosCamas (  ) {
        this.lista_de_camas = []

        const lista_de_camas_Docs = await db.collection("Hospitales").doc(this.idNumero).collection("CamasUTI").get()

        lista_de_camas_Docs.docs.forEach(( doc ) => {
            this.lista_de_camas.push({
                camaID: doc.data().camaID,
                estado: doc.data().estado
            })
        })

        return this.lista_de_camas
    }

    async crearCamaNueva () {
        const camaNueva = new CamaUTI()

        const camaID = (await db.collection("Hospitales").doc(this.idNumero).collection("CamasUTI").add({
            camaID: '',
            estado: false
        })).id

        await db.collection("Hospitales").doc(this.idNumero).collection("CamasUTI").doc(camaID).update({
            camaID
        })

        camaNueva.setCamaID(camaID)

        this.lista_de_camas.push(camaNueva)

        return camaNueva
    }

    async eliminarCama ( camaID ) {

        const cama = new CamaUTI( camaID )

        await cama.eliminarCama ( this.idNumero )

        const indexDelete = this.lista_de_camas.findIndex((cama) => cama.camaID === camaID)
        
        const camaEliminada = this.lista_de_camas.splice(indexDelete, 1)

        cama.setEstado( camaEliminada.estado )

        return cama
    }

    async ocuparCama ( camaID ) {

        const cama = new CamaUTI( camaID )

        await cama.ocuparCama( this.idNumero )

        const indexUpdate = this.lista_de_camas.findIndex((cama) => cama.camaID === camaID)

        this.lista_de_camas[indexUpdate].estado = true

        cama.setEstado( true )

        return cama
    }

    async desocuparCama ( camaID ) {
        
        const cama = new CamaUTI(camaID)

        await cama.desocuparCama( this.idNumero )

        const indexUpdate = this.lista_de_camas.findIndex((cama) => cama.camaID === camaID)

        this.lista_de_camas[indexUpdate].estado = false

        cama.setEstado( false )

        return cama
    }

    /* MOTEDOS ESTATICOS */

    static async verEstadoDeTodosLosHospitales (  ) {
        const { listaHospital } = utilHospital

        const listaHospitales = []
        const datosHospitales = await listaHospital()

        for (let i = 0; i < datosHospitales.length; i++) {
            const element = datosHospitales[i];
            const { uid, nombre } = element
            
            const hospital = new Hospital()
            await hospital.importarDatosHospital( uid )

            listaHospitales.push(hospital)
        }

        return listaHospitales
    }
    
    static async listaHospital ( ) {
        const listaHospital = []
        const hospitalesDocs = await db.collection("Hospitales").get()

        if (hospitalesDocs.empty) {
            return null
        }

        hospitalesDocs.forEach(hospital => {
            listaHospital.push(hospital.data())
        })

        return listaHospital
    }

    static async listaCamasPorHospital ( uidHospital ) {
        const listaCamas = []
        const camasDocs = await db.collection("Hospitales").doc(uidHospital).collection('CamasUTI').get()

        if (camasDocs.empty) {
            return null
        }

        camasDocs.forEach(cama => {
            listaCamas.push(cama.data())
        })

        return listaCamas
    }
}

module.exports = Hospital