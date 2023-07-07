import Swal from 'sweetalert2'
import { apiTipoTransactionCreate, apiTipoTransactionUpdate } from '../api/apiTipoTransaction'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export const formSchema = Yup.object().shape({
})

export const formOptions = { resolver: yupResolver(formSchema) }

export const formUserHelper = async (tipoTransaction, option) => {
  let resultado

  switch (option) {
    case 1:
      resultado = await apiTipoTransactionCreate(
        tipoTransaction.nombre
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
            window.location.href = '/listarTipoTransaction'
          } else {
            window.location.href = '/listarTipoTransaction'
          }
        })
      }
      break

    case 2:
      resultado = await apiTipoTransactionUpdate(
        tipoTransaction._id,
        tipoTransaction.nombre
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
            window.location.href = '/listarTipoTransaction'
          } else {
            window.location.href = '/listarTipoTransaction'
          }
        })
      }
      break
  }
}
