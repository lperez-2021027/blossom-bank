import axios from 'axios'
import Swal from 'sweetalert2'

// const URL = 'http://localhost:8080/api/'
const URL = 'https://back-end-sistema-bancario.vercel.app/api/'

export const apiRoles = async () => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token')
  try {
    const data = await axios.get(`${URL}roles/`,
      { headers: { 'x-token': token } })
    return data.data
  } catch ({ response: { data: { msg } } }) {
    // eslint-disable-next-line no-undef
    return data.message
  }
}

export const apiRolesCreate = async (rol) => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token')
  try {
    // eslint-disable-next-line no-unused-vars
    const roleSave = await axios.post(
            `${URL}roles/crearRol`, {
              // eslint-disable-next-line object-shorthand
              rol: rol
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
          // eslint-disable-next-line no-undef
          localStorage.removeItem('token')
          window.location.href = '/login'
        }
      })
    // eslint-disable-next-line no-lone-blocks
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
export const apiRolesUpdate = async (id, rol) => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token')
  console.log(id)
  console.log(rol)
  try {
    console.log(`${URL}roles/editarRol/${id}`)
    const rolSave = await axios.put(`${URL}roles/editarRol/${id}`, {
      // eslint-disable-next-line object-shorthand
      id: id,
      // eslint-disable-next-line object-shorthand
      rol: rol

    }, { headers: { 'x-token': token } })
    console.log(rolSave)

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
          // eslint-disable-next-line no-undef
          localStorage.removeItem('token')
          window.location.href = '/login'
        }
      })
    // eslint-disable-next-line no-lone-blocks
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

export const apiRolesDelete = async (id) => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token')
  try {
    // eslint-disable-next-line no-empty-pattern
    const {} = await axios.delete(`${URL}roles/eliminarRol/${id}`,
      { headers: { 'x-token': token } })
    return true
  } catch ({ response: { data: { message } } }) {
    if (message === 'el token ha expirado') {
      // eslint-disable-next-line no-undef
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    if (message) {
      return message
    }
  }
}
