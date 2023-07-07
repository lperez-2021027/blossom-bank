import Swal from 'sweetalert2'
import { apiRolesCreate, apiRolesUpdate } from '../api/apiRoles'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export const formSchema = Yup.object().shape({
})

export const formOptions = { resolver: yupResolver(formSchema) }

export const formRoles = async (roles, option) => {
  let resultado

  switch (option) {
    case 1:
      resultado = await apiRolesCreate(
        roles.rol
      )

      if (resultado) {
        Swal.fire({
          icon: 'success',
          title: 'Todo bien',
          text: 'Rol creado correctamente',
          showConfirmButton: true,
          confirmButtonText: 'Go  !'
        }).then((r) => {
          if (r.isConfirmed) {
            window.location.href = '/listarRoles'
          } else {
            window.location.href = '/listarRoles'
          }
        })
      }
      break

    case 2:
      resultado = await apiRolesUpdate(
        roles._id,
        roles.rol
      )

      if (resultado) {
        Swal.fire({
          icon: 'success',
          title: 'Todo bien',
          text: 'Rol editado correctamente',
          showConfirmButton: true,
          confirmButtonText: 'Go  !'
        }).then((r) => {
          if (r.isConfirmed) {
            window.location.href = '/listarRoles'
          } else {
            window.location.href = '/listarRoles'
          }
        })
      }
      break
  }
}
