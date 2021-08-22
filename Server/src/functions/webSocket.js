const CamaUTI = require("../model/CamaUTI")
const Hospital = require("../model/Hospital")
const RegistroActividad = require('../model/RegistroActividad')
const ResponseServer = require("../model/ResponseServer")
const tipoOperacion = require('../utils/tipoOperacion')

const functionsWebSocket = {}

// Funciones solicitadas

functionsWebSocket.ver_estado = async () => {
    // Se obtiene todos los datos de cada hospital
    const estadoHospital = await Hospital.verEstadoDeTodosLosHospitales()

    // // Registro de actividad
    // const registroActividad = new RegistroActividad( null, null, tipoOperacion.estadoActualHospitales )
    // await registroActividad.guardarRegistroActividad()

    // Respuesta del servidor
    const response = new ResponseServer({
        estado: 0,
        mensaje: `ok`,
        tipo_operacion: 1,
        respuesta: estadoHospital
    })

    return response.getResponseServer()
}

functionsWebSocket.crear_cama = async ( uidHospital ) => {
    // Se crea una cama nueva a partir de un nuevo objeto tipo Hospital
    let hospital = new Hospital(uidHospital)
    
    hospital = await hospital.importarDatosHospital(uidHospital)

    const cama = await hospital.crearCamaNueva()

    // // Registro de actividad
    // const registroActividad = new RegistroActividad(uidHospital, null, tipoOperacion.crearCamaUTI )
    // await registroActividad.guardarRegistroActividad()

    // Respuesta del servidor
    const response = new ResponseServer({
        estado: 0,
        mensaje: `ok`,
        tipo_operacion: 2,
        respuesta: {
            uidHospital,
            cama
        }
    })

    return response.getResponseServer()
}

functionsWebSocket.eliminar_cama = async ( uidHospital, uidCamaUTI ) => {
    // Se elimina una cama a partir de un nuevo objeto tipo Hospital
    let hospital = new Hospital(uidHospital)
    
    hospital = await hospital.importarDatosHospital(uidHospital)

    const cama = await hospital.eliminarCama( uidCamaUTI )

    if ( !cama ) {
        // // Registro de actividad
        // const registroActividad = new RegistroActividad(uidHospital, uidCamaUTI, tipoOperacion.eliminarCamaUTI )
        // await registroActividad.guardarRegistroActividad()

        // Respuesta del servidor
        const response = new ResponseServer({
            estado: -1,
            mensaje: `No se puede eliminar una cama ocupada`,
            tipo_operacion: 3,
            respuesta: null
        })

        return response.getResponseServer()
    }

    // // Registro de actividad
    // const registroActividad = new RegistroActividad(uidHospital, uidCamaUTI, tipoOperacion.eliminarCamaUTI )
    // await registroActividad.guardarRegistroActividad()

    // Respuesta del servidor
    const response = new ResponseServer({
        estado: 0,
        mensaje: `ok`,
        tipo_operacion: 3,
        respuesta: {
            uidHospital,
            cama
        }
    })

    return response.getResponseServer()
}

functionsWebSocket.ocupar_cama = async ( uidHospital, uidCamaUTI ) => {
    // Se actualizara una cama a partir de un nuevo objeto tipo Hospital
    let hospital = new Hospital(uidHospital)
    
    hospital = await hospital.importarDatosHospital(uidHospital)

    const cama = await hospital.ocuparCama( uidCamaUTI )

    console.log('cama', !cama)
    if ( !cama ) {
        // // Registro de actividad
        // const registroActividad = new RegistroActividad(uidHospital, uidCamaUTI, tipoOperacion.eliminarCamaUTI )
        // await registroActividad.guardarRegistroActividad()

        // Respuesta del servidor
        const response = new ResponseServer({
            estado: -1,
            mensaje: `No se puede ocupar una cama ocupada`,
            tipo_operacion: 4,
            respuesta: null
        })

        return response.getResponseServer()
    }

    // // Registro de actividad
    // const registroActividad = new RegistroActividad(uidHospital, uidCamaUTI, tipoOperacion.ocuparCamaUTI )
    // await registroActividad.guardarRegistroActividad()
    
    // Respuesta del servidor
    const response = new ResponseServer({
        estado: 0,
        mensaje: `ok`,
        tipo_operacion: 4,
        respuesta: {
            uidHospital,
            cama
        }
    })

    return response.getResponseServer()
}

functionsWebSocket.desocupar_cama = async ( uidHospital, uidCamaUTI ) => {
    // Se actualizara una cama a partir de un nuevo objeto tipo Hospital
    let hospital = new Hospital(uidHospital)
    
    hospital = await hospital.importarDatosHospital(uidHospital)

    const cama = await hospital.desocuparCama( uidCamaUTI )

    if ( !cama ) {
        // // Registro de actividad
        // const registroActividad = new RegistroActividad(uidHospital, uidCamaUTI, tipoOperacion.eliminarCamaUTI )
        // await registroActividad.guardarRegistroActividad()

        // Respuesta del servidor
        const response = new ResponseServer({
            estado: -1,
            mensaje: `No se puede desocupar una cama desocupada`,
            tipo_operacion: 5,
            respuesta: null
        })

        return response.getResponseServer()
    }

    // // Registro de actividad
    // const registroActividad = new RegistroActividad(uidHospital, uidCamaUTI, tipoOperacion.desocuparCamaUTI )
    // await registroActividad.guardarRegistroActividad()

    // Respuesta del servidor
    const response = new ResponseServer({
        estado: 0,
        mensaje: `ok`,
        tipo_operacion: 5,
        respuesta: {
            uidHospital,
            cama
        }
    })

    return response.getResponseServer()
}

// Otras funciones

functionsWebSocket.listaHospitales = async (  ) => {
    // Se obtiene la lista de hospitales
    const hospitales = await Hospital.listaHospital()

    // // Registro de actividad
    // const registroActividad = new RegistroActividad(null, null, tipoOperacion.desocuparCamaUTI )
    // await registroActividad.guardarRegistroActividad()

    // Respuesta del servidor
    const response = new ResponseServer({
        estado: 0,
        mensaje: `ok`,
        tipo_operacion: 6,
        respuesta: hospitales
    })

    return response.getResponseServer()
}

functionsWebSocket.listaCamasPorHospital = async ( uidHospital ) => {
    // Se obtiene la lista de camas por hospitales
    const camas = await Hospital.listaCamasPorHospital( uidHospital )

    // // Registro de actividad
    // const registroActividad = new RegistroActividad(uidHospital, null, tipoOperacion.desocuparCamaUTI )
    // await registroActividad.guardarRegistroActividad()

    // Respuesta del servidor
    const response = new ResponseServer({
        estado: 0,
        mensaje: `ok`,
        tipo_operacion: 7,
        respuesta: camas
    })

    return response.getResponseServer()
}

functionsWebSocket.datosCamaUTI = async ( uidHospital, uidCamaUTI ) => {
    // 
    const cama = new CamaUTI()
    await cama.importarDatosDeCamaUTI(uidHospital, uidCamaUTI)

    // // Registro de actividad
    // const registroActividad = new RegistroActividad(uidHospital, uidCamaUTI, tipoOperacion.desocuparCamaUTI )
    // await registroActividad.guardarRegistroActividad()

    // Respuesta del servidor
    const response = new ResponseServer({
        estado: 0,
        mensaje: `ok`,
        tipo_operacion: 8,
        respuesta: {
            uidHospital,
            cama
        }
    })

    return response.getResponseServer()
}

module.exports = functionsWebSocket