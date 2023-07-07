import axios from 'axios'

// const URL = 'http://localhost:8080/api'
const URL = 'https://back-end-sistema-bancario.vercel.app/api'

// eslint-disable-next-line no-undef
// const token = localStorage.getItem('token')

export const realizarTransaction = async (descripcion, cantidad, idTipoTransaction, noCuentaOr, noCuentaDest) => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token')
  try {
    const { data } = await axios.post(`${URL}/transaction/agregar`, {
      descripcion,
      cantidad,
      idTipoTransaction,
      noCuentaOr,
      noCuentaDest
    }, { headers: { 'x-token': token } })
    return data
  } catch (error) {
    const errors = error.response.data.msg
    if (errors) {
      throw new Error(errors)
    }

    throw new Error('Verifique los datos')
  }
}

export const getTipoTransfer = async () => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token')
  try {
    const { data } = await axios.get(`${URL}/tipoTransaction/mostrar`
      , { headers: { 'x-token': token } })
    return data
  } catch (error) {
    throw new Error('Error al obtener los tipos de transacciones')
  }
}

export const getMisCuentas = async () => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token')
  try {
    const { data } = await axios.get(`${URL}/cuentas/own`
      , { headers: { 'x-token': token } })
    return data
  } catch (error) {
    throw new Error('Error al obtener mis cuentas')
  }
}
