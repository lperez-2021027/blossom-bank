/* eslint-disable no-undef */

import axios from 'axios'
import Swal from 'sweetalert2'

// const URL = 'http://localhost:8080/api'
const URL = 'https://back-end-sistema-bancario.vercel.app/api'

export const obtenerMisFavoritos = async () => {
  try {
    const token = localStorage.getItem('token')
    const data = await axios.get(`${URL}/favorito/`, { headers: { 'x-token': token } })
    return data.data
  } catch (error) {
    console.log('Error al obtener mis cuentas:', error)
    throw new Error('Error al obtener mis cuentas')
  }
}

export const obtenerFavoritos = async () => {
  try {
    const token = localStorage.getItem('token')
    const { data: favoritosData } = await axios.get(`${URL}/favorito/`, { headers: { 'x-token': token } })
    return { favoritos: favoritosData }
  } catch (error) {
    console.log('Error al obtener las cuentas:', error)
    throw new Error('Error al obtener las cuentas')
  }
}

export const obtenerCuentas = async () => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${URL}/cuentas/`, { headers: { 'x-token': token } })
    return data
  } catch (error) {
    console.log('Error al obtener las cuentas:', error)
    throw new Error('Error al obtener las cuentas')
  }
}

export const obtenerUsuarios = async () => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${URL}/usuarios/`, { headers: { 'x-token': token } })
    return data
  } catch (error) {
    console.log('Error al obtener los usuarios:', error)
    throw new Error('Error al obtener los usuarios')
  }
}

export const obtenerUsuariosCliente = async () => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${URL}/usuarios/cuentaCliente`, { headers: { 'x-token': token } })
    return data
  } catch (error) {
    console.log('Error al obtener los usuarios:', error)
    throw new Error('Error al obtener los usuarios')
  }
}

export const crearFavorito = async (alias, noCuentaFav, idTipoCuenta) => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.post(`${URL}/favorito/agregarFavorito`, {
      alias,
      noCuentaFav,
      idTipoCuenta
    }, { headers: { 'x-token': token } })
    return data
  } catch (error) {
    if (error.response.status === 400) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear la cuenta',
        text: error.response.data.errors[0].msg
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear la cuenta',
        text: 'Verifique que los datos ingresados sean correctos'
      })
    }
  }
}

export const obtenerFavoritoPorId = async (id) => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${URL}/favorito/${id}`, { headers: { 'x-token': token } })
    return data
  } catch (error) {
    throw new Error('Error al obtener la cuenta')
  }
}

export const actualizarFavorito = async (id, alias, noCuentaFav, idTipoCuenta) => {
  try {
    console.log(alias)
    const token = localStorage.getItem('token')
    const { data } = await axios.put(`${URL}/favorito/editarFavorito/${id}`,
      { alias, noCuentaFav, idTipoCuenta },
      { headers: { 'x-token': token } })
    return data
  } catch (error) {
    if (error.response.status === 400) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear la cuenta',
        text: error.response.data.errors[0].msg
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear la cuenta',
        text: 'Verifique que los datos ingresados sean correctos'
      })
    }
  }
}

export const eliminarFavorito = async (id) => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.delete(`${URL}/favorito/eliminarFavorito/${id}`, { headers: { 'x-token': token } })
    return data
  } catch (error) {
    console.log('Error al eliminar la cuenta:', error)
    throw new Error('Error al eliminar la cuenta')
  }
}
