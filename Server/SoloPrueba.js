const CamaUTI = require('./src/model/CamaUTI')

const cama1 = new CamaUTI(1, true)
console.log('cama1: ', cama1)

async function a () {

  const camaNueva = await CamaUTI.agregarCama(1605, false)
  console.log('cama nueva: ', camaNueva) 

  const camas = await CamaUTI.verCamas()
  console.log('camas: ', camas);

}

a()