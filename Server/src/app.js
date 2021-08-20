// app.js
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

// Configuraciones
app.set('port', process.env.PORT || 1605)

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}))

app.use(cors(function (req, callback) {
  var corsOptions;
  let allowlist = ['http://localhost:8080', 'http://localhost:1605']
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Archivos publicos
app.use(express.static(path.join(__dirname, 'public')))

// Routes


// Iniciamos el servidor en su puerto correspondiente o el puerto 1605
const server = app.listen(app.get('port'), function () {
  console.log(`Servidor iniciado en http://localhost:${app.get('port')}`)
})

module.exports = {
  app,
  server
}