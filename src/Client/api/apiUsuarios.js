/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-empty */
import axios from 'axios'
import Swal from 'sweetalert2'

// const URL = 'http://localhost:8080/api/usuarios/'
const URL = 'https://back-end-sistema-bancario.vercel.app/api/usuarios/'

export const apiUsuarios = async () => {
  const token = localStorage.getItem('token')
  try {
    const listaUsuarios = await axios.get(`${URL}`, { headers: { 'x-token': token } })
    console.log(listaUsuarios.data)
    return listaUsuarios.data
  } catch (error) {}
}
export const obtenerCliente = async () => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${URL}cuentaCliente`, { headers: { 'x-token': token } })
    return data
  } catch (error) {
    console.log('Error al obtener el usuario:', error)
    throw new Error('Error al obtener el usuario')
  }
}
export const UpdateProfile = async (alias, celular, password) => {
  const token = localStorage.getItem('token')
  try {
    const { data } = await axios.put(
      `${URL}editarMiPerfil`,
      {
        alias,
        celular,
        password
      },
      { headers: { 'x-token': token } }
    )
    return true
  } catch (error) {
    console.log(error)
  }
}
