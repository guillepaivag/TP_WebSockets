const socket = io('http://localhost:1605')

socket.on('bienvenido', (data) => {
    const { bienvenido } = data
    
    console.log(bienvenido)
})