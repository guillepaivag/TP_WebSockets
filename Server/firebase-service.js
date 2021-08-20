const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
    // credential: admin.credential.applicationDefault(),
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sistemareclamosande2021.firebaseio.com"
})

module.exports = admin