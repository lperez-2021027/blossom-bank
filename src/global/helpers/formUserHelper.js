import { CreateUser, UpdateUser } from '../../Admin/api/apiUsuarios'
import Swal from 'sweetalert2'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { UpdateProfile } from '../../Client/api/apiUsuarios'

// validaciones
export const formSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre de usuario es requerido'),
  correo: Yup.string()
    .required('El correo electrónico es requerido')
    .email('Debe ser un correo electrónico válido')
})
export const formOptions = { resolver: yupResolver(formSchema) }

export const sendData = async (usuario, option) => {
  let resultado
  switch (option) {
    case 1:

      resultado = await CreateUser(
        usuario.nombre,
        usuario.alias,
        usuario.dpi,
        usuario.direccion,
        usuario.celular,
        usuario.correo,
        usuario.password,
        usuario.profesion,
        usuario.ingresos
      )
      if (resultado) {
        Swal.fire({
          icon: 'success',
          title: 'Genial!',
          text: 'usuario creado correctamente!',
          showConfirmButton: true,
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/admin-usuarios'
          } else {
            window.location.href = '/agregarUsuarioAdmin'
          }
        })
      }
      break
    case 2:
      console.log(usuario._id)
      resultado = await UpdateUser(
        usuario._id,
        usuario.nombre,
        usuario.alias,
        usuario.direccion,
        usuario.celular,
        usuario.correo,
        usuario.profesion,
        usuario.ingresos

      )
      if (resultado) {
        Swal.fire({
          icon: 'success',
          title: 'Genial!',
          text: 'usuario actualizado correctamente!',
          confirmButtonText: true,
          // eslint-disable-next-line no-dupe-keys
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
          } else {
            window.location.href = '/admin-usuarios'
          }
        })
      }
      break
    case 3:
      console.log(usuario._id)
      resultado = await UpdateProfile(
        usuario.alias,
        usuario.celular,
        usuario.password
      )
      if (resultado) {
        Swal.fire({
          icon: 'success',
          title: 'Genial!',
          text: 'perfil actualizado correctamente!',
          confirmButtonText: true,
          // eslint-disable-next-line no-dupe-keys
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) { window.location.reload() } else { /* empty */ }
        })
      }
      break
  }
}
