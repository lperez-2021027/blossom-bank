import Swal from 'sweetalert2'
import { apiTipoCuentaCreate, apiTipoCuentaUpdate } from '../api/apiTipoCuenta'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export const formSchema = Yup.object().shape({
})

export const formOptions = { resolver: yupResolver(formSchema) }

export const formUserHelper = async (tipoCuenta, option) => {
  let resultado

  switch (option) {
    case 1:
      resultado = await apiTipoCuentaCreate(
        tipoCuenta.nombre
      )

      if (resultado) {
        Swal.fire({
          icon: 'success',
          title: 'Todo bien',
          text: 'Tipo de cuenta creado correctamente',
          showConfirmButton: true,
          confirmButtonText: 'Go  !'
        }).then((r) => {
          if (r.isConfirmed) {
            window.location.href = '/listarTipoCuenta'
          } else {
            window.location.href = '/listarTipoCuenta'
          }
        })
      }
      break

    case 2:
      resultado = await apiTipoCuentaUpdate(
        tipoCuenta._id,
        tipoCuenta.nombre
      )

      if (resultado) {
        Swal.fire({
          icon: 'success',
          title: 'Todo bien',
          text: 'Tipo de cuenta editado correctamente',
          showConfirmButton: true,
          confirmButtonText: 'Go  !'
        }).then((r) => {
          if (r.isConfirmed) {
            window.location.href = '/listarTipoCuenta'
          } else {
            window.location.href = '/listarTipoCuenta'
          }
        })
      }
      break
  }
}
