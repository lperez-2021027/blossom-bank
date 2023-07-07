import { TipoTransaction } from '../models/tipoTransaction.models'
import { FormTipoTransaction } from './FormTipoTransaction'

export const CreateTipoTransaction = () => {
  return (
    <>

      <FormTipoTransaction
        tipoTransactionProp={TipoTransaction}
        titleButton='Crear'
        option={1}
      />
    </>
  )
}
