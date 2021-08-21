import environment from './environment.js'
const server = environment === 'production' ? 'https://camasuti.herokuapp.com' : 'http://localhost:1605'

const socket = io(server)

socket.on('bienvenido', (data) => {
    const { bienvenido } = data
    
    console.log(bienvenido)
})