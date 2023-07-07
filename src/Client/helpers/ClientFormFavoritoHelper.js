import { crearFavorito, actualizarFavorito } from '../api/apiFavoritos'
import Swal from 'sweetalert2'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// validaciones
export const formSchema = Yup.object().shape({
  alias: Yup.string().required('El alias es requerido')
})
export const formOptions = { resolver: yupResolver(formSchema) }

export const sendData = async (favorito, option) => {
  let resultado
  switch (option) {
    case 1:
      resultado = await crearFavorito(
        favorito.alias,
        favorito.noCuentaFav,
        favorito.idTipoCuenta
      )
      if (resultado) {
        Swal.fire({
          icon: 'success',
          title: 'Genial!',
          text: 'Favorito creado correctamente!',
          showConfirmButton: true,
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/user-favoritos'
          } else {
            window.location.href = '/agregarFavorito'
          }
        })
      }
      break
    case 2:
      resultado = await actualizarFavorito(
        favorito._id,
        favorito.alias,
        favorito.noCuentaFav,
        favorito.idTipoCuenta
      )
      if (resultado) {
        Swal.fire({
          icon: 'success',
          title: 'Genial!',
          text: 'Favorito actualizado correctamente!',
          confirmButtonText: true,
          // eslint-disable-next-line no-dupe-keys
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/user-favoritos'
          }
        })
      }
      break
  }
}
