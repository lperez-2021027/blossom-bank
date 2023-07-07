import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { formOptions, formUserHelper } from '../helpers/fromTipoTransaction'

import { AdminNavBar } from './AdminNavBar'

// HotelProp es mi modelo
export const FormTipoTransaction = ({ tipoTransactionProp, titleButton, option }) => {
  const [tipoTransaction, setTipoTransaction] = useState(tipoTransactionProp)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm(formOptions)

  useEffect(() => {
    setTipoTransaction({ ...tipoTransaction })
  }, [])

  const crud = async () => {
    await formUserHelper(tipoTransaction, option)
  }
  console.log(tipoTransaction)
  return (
    <>
      <div>
        {
          (option === 1) ? <AdminNavBar /> : null
        }
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-lg-1 col-sm' />
          <div className='col-lg-10 col-sm-12'>

            <div>
              {
                (option === 1)
                  ? <h2 className='txt-secondary py-4'>Agregar un tipo de transacción</h2>
                  : <h2>Editar el tipo de transacción </h2>
              }
            </div>
            <button className='btn btn-primary mb-4'>
              <Link className='nav-link txt-buttons fs-5' to='/listarTipoTransaction'>
                Volver
              </Link>
            </button>
            <form className='fs-5' onSubmit={handleSubmit(crud)}>
              <label className='pb-1'>Nombre del tipo de transacción</label>
              <input
                {...register('nombre')}
                type='text'
                required
                className='form-control'
                value={tipoTransaction.nombre}
                onChange={({ target: { value } }) => {
                  setTipoTransaction(() => ({ ...tipoTransaction, nombre: value }))
                }}
              />
              {errors.nombre && (<span>{errors.nombre.message}</span>)}
              <br />
              <button type='submit' className='btn btn-success fs-5 '>{titleButton}</button>
            </form>
          </div>
          <div className='col-lg-1 col-sm' />
        </div>
      </div>

    </>
  )
}
