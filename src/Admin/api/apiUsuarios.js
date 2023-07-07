/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-empty */
import axios from 'axios'
import Swal from 'sweetalert2'

// const token = localStorage.getItem('token')
// const URL = 'http://localhost:8080/api/usuarios/'
const URL = 'https://back-end-sistema-bancario.vercel.app/api/usuarios/'

export const apiUsuarios = async () => {
  const token = localStorage.getItem('token')
  try {
    const listaUsuarios = await axios.get(`${URL}`, { headers: { 'x-token': token } })
    return listaUsuarios.data
  } catch (error) {}
}
export const CreateUser = async (nombre, alias, dpi, direccion, celular, correo, password, profesion, ingresos) => {
  const token = localStorage.getItem('token')
  try {
    // eslint-disable-next-line no-unused-vars
    const userSave = await axios.post(
      // ruta de postman

      `${URL}agregarCliente`,
      {
        nombre,
        alias,
        dpi,
        direccion,
        celular,
        correo,
        password,
        profesion,
        ingresos
      },
      { headers: { 'x-token': token } }
    )
    return true
  } catch ({
    response: {
      data: { message }
    }
  }) {
    if (message === 'el token ha expirado') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        showConfirmButton: true,
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token')
          window.location.href = '/login'
        } else {
          localStorage.removeItem('token')
          window.location.href = '/login'
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        showConfirmButton: true,
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
        } else {
        }
      })
    }
  }
}
export const DeleteUSer = async (id) => {
  const token = localStorage.getItem('token')
  try {
    const { data } = await axios.delete(`${URL}eliminar/${id}`, {
      headers: { 'x-token': token }
    })
    return true
  } catch ({
    response: {
      data: { message }
    }
  }) {
    if (message === 'el token ha expirado') {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    if (message) {
      return message
    }
  }
}
export const UpdateUser = async (id, nombre, alias, direccion, celular, correo, profesion, ingresos) => {
  const token = localStorage.getItem('token')
  try {
    const { data } = await axios.put(
      `${URL}editar/${id}`,
      {
        nombre,
        alias,
        direccion,
        celular,
        correo,
        profesion,
        ingresos
      },
      { headers: { 'x-token': token } }
    )
    return true
  } catch (error) {
    console.log(error)
  }
}
