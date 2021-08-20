const admin = require('../../firebase-service')
const db = admin.firestore()
const utilHospital = {}

utilHospital.listaHospital = async () => {
    
    const uidHospitales = []
    const hospitalesDocs = await db.collection('Hospitales').get()

    hospitalesDocs.forEach((hospital) => {
        uidHospitales.push({
            uid: hospital.id,
            nombre: hospital.data().nombre
        })
    })

    return uidHospitales
}

module.exports = utilHospital