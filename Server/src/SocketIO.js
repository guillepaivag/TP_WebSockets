const SocketIO = require('socket.io')
const { app, server } = require('./app')
const {
    ver_estado,
    crear_cama,
    eliminar_cama,
    ocupar_cama,
    desocupar_cama,
    listaHospitales,
    listaCamasPorHospital,
    datosCamaUTI
} = require('./functions/webSocket')
const ResponseServer = require('./model/ResponseServer')

// WebSockets
let origin = ['https://websocketscamasuti.firebaseapp.com', 'https://websocketscamasuti.web.app', 'https://camasuti.herokuapp.com']
if (process.env.NODE_ENV != 'production') {
    origin.push(...['http://localhost:8080', 'http://localhost:8090'])
}
const io = SocketIO(server, {
    cors: {
        origin,
        methods: ["GET", "POST"],
        credentials: true
    }
})

// Comienza la conexión con socket.io y con un mensaje de bienvenida
io.on('connection', async function (socket) {
    console.log(`Nuevo cliente conectado: ${socket.id}`)
    socket.emit('bienvenido', {
        bienvenido: '¡Bienvenido al mejor server del planeta! <3'
    })

    // Operaciones solicitadas, de acuerdo a especificaciones del trabajo.
    /*Lista de operaciones en server: 
     - Op 1 (ver_estado): Se ve el estado de las todas las camas, disponible u ocupado.
     - Op 2 (crear_cama): Crea una cama en el hospital seleccionado.
     - Op 3 (eliminar_cama): Elimina una cama del hospital seleccionado.
     - Op 4 (ocupar_cama): Ocupa la cama seleccionada.
     - Op 5 (desocupar_cama): Desocupa la cama seleccionada.
     - Op 6 (lista_hospitales): Muestra la lista de hospitales.
     - Op 7 (lista_camas): Muestra la lista de camas por hospital.
     - Op 8 (datos_uti): Datos del hospital para mostrar en tiempo real.
     - Otros: Respuesta -1 para transaccion indeterminada.*/

    socket.on('operacion', async ( data ) => {
        
        const { tipo_operacion, datos } = data
            
        if ( datos ) {
            var { uidHospital, uidCamaUTI } = datos
            uidHospital = String(uidHospital)
        }
        
        try {
            let response
            socket.emit('bienvenido', {
                bienvenido: `Bienvenido ${data.id}`
            })

            switch ( tipo_operacion ) {
                case 1:              
                    response = await ver_estado()
                    console.log('response', response)

                    if (response.estado != 0) {
                        socket.emit('responseServer_problemSystem', response)
                        return
                    }

                    socket.emit('responseServer_verEstado', response)
                    break;

                case 2:
                    response = await crear_cama( uidHospital )
                    if (response.estado != 0) {
                        socket.emit('responseServer_problemSystem', response)
                        return
                    }
                    socket.emit('responseServer_camaCreada', response)
                    break;

                case 3:
                    response = await eliminar_cama( uidHospital, uidCamaUTI )
                    if (response.estado != 0) {
                        socket.emit('responseServer_problemSystem', response)
                        return
                    }
                    socket.emit('responseServer_camaEliminada', response)
                    break;

                case 4:
                    response = await ocupar_cama( uidHospital, uidCamaUTI )
                    if (response.estado != 0) {
                        socket.emit('responseServer_problemSystem', response)
                        return
                    }
                    socket.emit('responseServer_camaOcupada', response)
                    break;

                case 5:
                    response = await desocupar_cama( uidHospital, uidCamaUTI )
                    if (response.estado != 0) {
                        socket.emit('responseServer_problemSystem', response)
                        return
                    }
                    socket.emit('responseServer_camaDesocupada', response)
                    break;

                case 6: 
                    response = await listaHospitales()
                    if (response.estado != 0) {
                        socket.emit('responseServer_problemSystem', response)
                        return
                    }
                    socket.emit('responseServer_listaHospitales', response)
                    break;

                case 7: 
                    response = await listaCamasPorHospital ( uidHospital )
                    if (response.estado != 0) {
                        socket.emit('responseServer_problemSystem', response)
                        return
                    }
                    socket.emit('responseServer_listaCamas', response)
                    break;

                case 8: 
                    response = await datosCamaUTI ( uidHospital, uidCamaUTI )
                    if (response.estado != 0) {
                        socket.emit('responseServer_problemSystem', response)
                        return
                    }
                    socket.emit('responseServer_datosCama', response)
                    break;

                default:
                    response = new ResponseServer({
                        estado: -1,
                        mensaje: 'No existe esta operación',
                        tipo_operacion,
                        respuesta: null
                    }).getResponseServer()
                    socket.emit('responseServer_problemSystem', response)
                    
                    break;
            }

        } catch (error) {
            let response = new ResponseServer({
                estado: 777,
                mensaje: 'Hubo un problema, no se puede realizar la transacción.',
                tipo_operacion,
                respuesta: error
            }).getResponseServer()
            
            socket.emit('responseServer_problemSystem', response)
        }

    })

    // Desconeccion del cliente

    socket.on('disconnect', (socket) => {
        console.log(`Cliente desconectado..`)
    })

})
