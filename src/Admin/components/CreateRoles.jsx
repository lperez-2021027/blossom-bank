import { Roles } from '../models/roles.models'
import { FormRoles } from './FormRoles'

export const CreateRoles = () => {
  return (
    <>

      <FormRoles
        rolesProp={Roles}
        titleButton='Crear'
        option={1}
      />
    </>
  )
}
