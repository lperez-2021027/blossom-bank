import axios from 'axios'
import Swal from 'sweetalert2'

// const URL = 'http://localhost:8080/api/auth/'
const URL = 'https://back-end-sistema-bancario.vercel.app/api/auth/'

export const apiLogin = async (correo, password) => {
  try {
    const response = await axios.post(`${URL}login`,
      {
        correo,
        password
      })

    // eslint-disable-next-line func-call-spacing
    const token = response.data.token

    // eslint-disable-next-line no-unused-expressions, no-undef
    token ? localStorage.setItem('token', token) : null

    // if (response) {
    //   Swal.fire({
    //     icon: 'success',
    //     title: '¡ Genial !',
    //     text: '¡Ha iniciado sesión con exito!',
    //     confirmButtonText: 'Ok'
    //   })
    // }
    return response
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al intentar iniciar sesión',
      text: error.response.data.msg
    })
  }
}
