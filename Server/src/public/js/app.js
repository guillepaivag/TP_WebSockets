const socket = io('http://localhost:1605')

const agregarCamaUTI = document.getElementById('agregarCamaUTI')

agregarCamaUTI.addEventListener('click', (e) => {
    e.preventDefault()

    socket.emit('ver:CamaUTI', {
        hospital: 1,
        estado: false
    })
})

socket.on('mensaje', (data) => {
    console.log(`mensaje -> `, data)
})