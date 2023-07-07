/* eslint-disable no-undef */

import axios from 'axios'

import Swal from 'sweetalert2'

// const URL = 'http://localhost:8080/api'
const URL = 'https://back-end-sistema-bancario.vercel.app/api'

export const obtenerMisCuentas = async () => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${URL}/cuentas/own`, { headers: { 'x-token': token } })
    return data
  } catch (error) {
    console.log('Error al obtener mis cuentas:', error)
    throw new Error('Error al obtener mis cuentas')
  }
}

export const obtenerCuentas = async (searchTerm) => {
  try {
    const token = localStorage.getItem('token')
    const { data: cuentasData } = await axios.get(`${URL}/cuentas/`, { headers: { 'x-token': token } })
    const { data: usuariosData } = await axios.get(`${URL}/usuarios/`, { headers: { 'x-token': token } })

    if (searchTerm) {
      const filteredCuentas = cuentasData.filter((cuenta) => {
        const usuario = usuariosData.find((usuario) => usuario._id === cuenta.idUsuario)
        const searchTermLower = searchTerm.toLowerCase()
        const cuentaNoCuentaLower = cuenta.noCuenta.toLowerCase()
        const usuarioNombreLower = usuario.nombre.toLowerCase()
        return cuentaNoCuentaLower.includes(searchTermLower) || usuarioNombreLower.includes(searchTermLower)
      })

      return filteredCuentas
    } else {
      return cuentasData
    }
  } catch (error) {
    console.log('Error al obtener las cuentas:', error)
    throw new Error('Error al obtener las cuentas')
  }
}

export const obtenerCuentaPorIdCliente = async (id) => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${URL}/cuentas/cuentasCliente/${id}`, { headers: { 'x-token': token } })
    return data
  } catch (error) {
    console.log('Error al obtener la cuenta:', error)
    throw new Error('Error al obtener la cuenta')
  }
}

export const obtenerTiposCuentas = async () => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${URL}/tipocuenta/mostrar`, { headers: { 'x-token': token } })
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

export const crearCuenta = async (idUsuario, saldo, idTipoCuenta) => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.post(`${URL}/cuentas/crearCuenta`, {
      idUsuario,
      saldo,
      idTipoCuenta
    }, { headers: { 'x-token': token } })
    return data
  } catch (error) {
    console.log('Error al crear la cuenta:', error)
    if (error.response && error.response.status === 400) {
      const { msg } = error.response.data
      if (msg === 'El usuario ya tiene este tipo de cuenta') {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la cuenta',
          text: msg
        })
      } else if (msg === 'El saldo debe ser igual o mayor a 100') {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la cuenta',
          text: msg
        })
      }
    }
    throw new Error('Error al crear la cuenta')
  }
}

export const obtenerCuentaPorId = async (id) => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${URL}/cuentas/${id}`, { headers: { 'x-token': token } })
    return data
  } catch (error) {
    console.log('Error al obtener la cuenta:', error)
    throw new Error('Error al obtener la cuenta')
  }
}

export const actualizarCuenta = async (id, saldo) => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.put(`${URL}/cuentas/actualizarCuenta/${id}`, { saldo }, { headers: { 'x-token': token } })
    return data
  } catch (error) {
    console.log('Error al actualizar la cuenta:', error)
    throw new Error('Error al actualizar la cuenta')
  }
}

export const eliminarCuenta = async (id) => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.delete(`${URL}/cuentas/eliminar/${id}`, { headers: { 'x-token': token } })
    return data
  } catch (error) {
    console.log('Error al eliminar la cuenta:', error)
    throw new Error('Error al eliminar la cuenta')
  }
}

export const obtenerCuentasOrdenAsc = async () => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${URL}/cuentas/asc`, { headers: { 'x-token': token } })
    return data
  } catch (error) {
    console.log('Error al obtener las cuentas ordenadas ascendentemente:', error)
    throw new Error('Error al obtener las cuentas ordenadas ascendentemente')
  }
}

export const obtenerCuentasOrdenDesc = async () => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${URL}/cuentas/desc`, { headers: { 'x-token': token } })
    return data
  } catch (error) {
    console.log('Error al obtener las cuentas ordenadas descendentemente:', error)
    throw new Error('Error al obtener las cuentas ordenadas descendentemente')
  }
}
