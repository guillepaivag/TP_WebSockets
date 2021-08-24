export default {
    state: {
        listaHospitales: []
    },
    mutations: {
        setListaHospitales(state, hospitales) {
            console.log('setListaHospitales: ', hospitales)

            state.listaHospitales = hospitales

            console.log('state.listaHospitales', state.listaHospitales)
        }
    },
    actions: {
        SOCKET_bienvenido ( { state }, data ) {
            console.log('SOCKET_bienvenido: ', data)
            
            return data
        },
        SOCKET_responseServer_listaHospitales ( { dispatch, commit, state }, data ) {
            console.log('SOCKET_responseServer_listaHospitales: ', data)
            
            commit('setListaHospitales', data.respuesta)
        },
    },
    getters: {
        getListaHospitales ( state ) {
            return state.listaHospitales
        }
    },
    modules: {
    },
}
