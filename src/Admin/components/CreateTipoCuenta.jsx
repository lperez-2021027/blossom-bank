import { TipoCuenta } from '../models/tipoCuenta.models'
import { FormTipoCuenta } from './FormTipoCuenta'

export const CreateTipoCuenta = () => {
  return (
    <>

      <FormTipoCuenta
        tipoCuentaProp={TipoCuenta}
        titleButton='Crear'
        option={1}
      />
    </>
  )
}
