const Hospital = require("../model/Hospital")
const RegistroActividad = require('../model/RegistroActividad')
const ResponseServer = require("../model/ResponseServer")
const tipoOperacion = require('../utils/tipoOperacion')

const functionsWebSocket = {}

// Funciones solicitadas

functionsWebSocket.ver_estado = async () => {
    // Se obtiene todos los datos de cada hospital
    const estadoHospital = await Hospital.verEstadoDeTodosLosHospitales()

    // Registro de actividad
    const registroActividad = new RegistroActividad( null, null, tipoOperacion.estadoActualHospitales )
    await registroActividad.guardarRegistroActividad()

    // Respuesta del servidor
    const response = new ResponseServer({
        estado: 0,
        mensaje: 'Estado de todos los hospitales enviado con exito.',
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

    // Registro de actividad
    const registroActividad = new RegistroActividad(uidHospital, null, tipoOperacion.crearCamaUTI )
    await registroActividad.guardarRegistroActividad()

    // Respuesta del servidor
    const response = new ResponseServer({
        estado: 0,
        mensaje: `¡Se agrego una cama para el hospital ${uidHospital}!`,
        tipo_operacion: 2,
        respuesta: cama
    })

    return response.getResponseServer()
}

functionsWebSocket.eliminar_cama = async ( uidHospital, uidCamaUTI ) => {
    // Se elimina una cama a partir de un nuevo objeto tipo Hospital
    let hospital = new Hospital(uidHospital)
    
    hospital = await hospital.importarDatosHospital(uidHospital)

    const cama = await hospital.eliminarCama( uidCamaUTI ) 

    // Registro de actividad
    const registroActividad = new RegistroActividad(uidHospital, uidCamaUTI, tipoOperacion.eliminarCamaUTI )
    await registroActividad.guardarRegistroActividad()

    // Respuesta del servidor
    const response = new ResponseServer({
        estado: 0,
        mensaje: `¡Se elimino la cama ${uidCamaUTI} del hospital ${uidHospital}!`,
        tipo_operacion: 3,
        respuesta: cama
    })

    return response.getResponseServer()
}

functionsWebSocket.ocupar_cama = async ( uidHospital, uidCamaUTI ) => {
    // Se actualizara una cama a partir de un nuevo objeto tipo Hospital
    let hospital = new Hospital(uidHospital)
    
    hospital = await hospital.importarDatosHospital(uidHospital)

    const cama = await hospital.ocuparCama( uidCamaUTI )

    // Registro de actividad
    const registroActividad = new RegistroActividad(uidHospital, uidCamaUTI, tipoOperacion.ocuparCamaUTI )
    await registroActividad.guardarRegistroActividad()
    
    // Respuesta del servidor
    const response = new ResponseServer({
        estado: 0,
        mensaje: `¡Se ocupo la cama ${uidCamaUTI} del hospital ${uidHospital}!`,
        tipo_operacion: 4,
        respuesta: cama
    })

    return response.getResponseServer()
}

functionsWebSocket.desocupar_cama = async ( uidHospital, uidCamaUTI ) => {
    // Se actualizara una cama a partir de un nuevo objeto tipo Hospital
    let hospital = new Hospital(uidHospital)
    
    hospital = await hospital.importarDatosHospital(uidHospital)

    const cama = await hospital.desocuparCama( uidCamaUTI )

    // Registro de actividad
    const registroActividad = new RegistroActividad(uidHospital, uidCamaUTI, tipoOperacion.desocuparCamaUTI )
    await registroActividad.guardarRegistroActividad()

    // Respuesta del servidor
    const response = new ResponseServer({
        estado: 0,
        mensaje: `¡Se desocupo la cama ${uidCamaUTI} del hospital ${uidHospital}!`,
        tipo_operacion: 5,
        respuesta: cama
    })

    return response.getResponseServer()
}

// Otras funciones

functionsWebSocket.listaHospitales = async (  ) => {
    // Se obtiene la lista de hospitales
    const hospitales = await Hospital.listaHospital()

    // Registro de actividad
    const registroActividad = new RegistroActividad(null, null, tipoOperacion.desocuparCamaUTI )
    await registroActividad.guardarRegistroActividad()

    // Respuesta del servidor
    const response = new ResponseServer({
        estado: 0,
        mensaje: `Se obtuvo la lista de hospitales de forma correcta.`,
        tipo_operacion: 6,
        respuesta: hospitales
    })

    return response.getResponseServer()
}

functionsWebSocket.listaCamasPorHospital = async ( uidHospital ) => {
    // Se obtiene la lista de camas por hospitales
    const camas = await Hospital.listaCamasPorHospital( uidHospital )

    // Registro de actividad
    const registroActividad = new RegistroActividad(uidHospital, null, tipoOperacion.desocuparCamaUTI )
    await registroActividad.guardarRegistroActividad()

    // Respuesta del servidor
    const response = new ResponseServer({
        estado: 0,
        mensaje: `Se obtuvo la lista de camas del hospital ${uidHospital} de forma correcta.`,
        tipo_operacion: 7,
        respuesta: camas
    })

    return response.getResponseServer()
}

module.exports = functionsWebSocket