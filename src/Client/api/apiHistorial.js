import axios from 'axios'

// const URL = 'http://localhost:8080/api'
const URL = 'https://back-end-sistema-bancario.vercel.app/api'

export const getMiHistorial = async () => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token')

  try {
    const { data } = await axios.get(`${URL}/historial/mine`
      , { headers: { 'x-token': token } })
    return data
  } catch (error) {
    throw new Error('Error al obtener mi historial de transacciones :c')
  }
}
