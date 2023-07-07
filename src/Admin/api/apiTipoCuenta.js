/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-lone-blocks */
import axios from 'axios'
import Swal from 'sweetalert2'

// const URL = 'http://localhost:8080/api/tipocuenta/'
const URL = 'https://back-end-sistema-bancario.vercel.app/api/tipocuenta/'

export const apiTipoCuenta = async () => {
  try {
    const token = localStorage.getItem('token')
    const data = await axios.get(`${URL}mostrar`,
      { headers: { 'x-token': token } })
    console.log(data)
    return data.data
  } catch ({ response: { data: { msg } } }) {
    return data.message
  }
}

// API ruta para crear un usuarioc
export const apiTipoCuentaCreate = async (nombre) => {
  try {
    const token = localStorage.getItem('token')
    const userSave = await axios.post(
            `${URL}agregar`, {
              nombre
            }, { headers: { 'x-token': token } })

    return true
  } catch ({ response: { data: { msg } } }) {
    if (msg === 'el token ha expirado') {
      Swal.fire({
        icon: 'info',
        title: 'Error',
        text: msg,
        showConfirmButton: true,
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token')
          window.location.href = '/login'
        }
      })
    } {
      Swal.fire({
        icon: 'error',
        title: 'Error al agregar',
        text: msg,
        showConfirmButton: true,
        confirmButtonText: 'Ok'
      }).then((result) => {
        console.log(result)
      })
    }
  }
}
export const apiTipoCuentaUpdate = async (id, nombre) => {
  console.log(id)
  console.log(nombre)
  try {
    const token = localStorage.getItem('token')
    console.log(`${URL}editar/${id}`)
    const userSave = await axios.put(`${URL}editar/${id}`, {
      id,
      nombre

    }, { headers: { 'x-token': token } })
    console.log(userSave)

    return true
  } catch ({ response: { data: { message } } }) {
    if (message === 'el token ha expirado') {
      Swal.fire({
        icon: 'info',
        title: 'Error',
        text: 'Inicie sesion de nuevo',
        showConfirmButton: true,
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token')
          window.location.href = '/login'
        }
      })
    } {
      Swal.fire({
        icon: 'error',
        title: 'Error al editar',
        text: message,
        showConfirmButton: true,
        confirmButtonText: 'Ok'
      }).then((result) => {
        console.log(result)
      })
    }
  }
}

export const apiTipoCuentaDelete = async (id) => {
  try {
    const token = localStorage.getItem('token')
    const { } = await axios.delete(`${URL}/eliminar/${id}`,
      { headers: { 'x-token': token } })
    return true
  } catch ({ response: { data: { message } } }) {
    if (message === 'el token ha expirado') {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    if (message) {
      return message
    }
  }
}
