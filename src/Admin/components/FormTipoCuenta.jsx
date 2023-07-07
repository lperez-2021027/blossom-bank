import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { formOptions, formUserHelper } from '../helpers/fromTipoCuenta'

import { AdminNavBar } from './AdminNavBar'

// HotelProp es mi modelo
export const FormTipoCuenta = ({ tipoCuentaProp, titleButton, option }) => {
  const [tipoCuenta, setTipoCuenta] = useState(tipoCuentaProp)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm(formOptions)

  useEffect(() => {
    setTipoCuenta({ ...tipoCuenta })
  }, [])

  const crud = async () => {
    await formUserHelper(tipoCuenta, option)
  }
  console.log(tipoCuenta)
  return (
    <>
      <div>
        {
          (option === 1)
            ? <AdminNavBar />
            : null
        }
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-lg-1 col-sm' />
          <div className='col-lg-10 col-sm-12'>
            <div>
              {
                (option === 1)
                  ? <h2 className='txt-secondary py-4'>Agregar un tipo de Cuenta</h2>
                  : <h2>Editar el tipo de cuenta</h2>
              }
            </div>
            <button className='btn btn-primary mb-3'>
              <Link className='nav-link txt-buttons fs-5' to='/listarTipoCuenta'>
                Volver
              </Link>
            </button>
            <form className='fs-5' onSubmit={handleSubmit(crud)}>
              <label className='pb-1'>Nombre del tipo de cuenta</label>
              <input
                {...register('nombre')}
                type='text'
                required
                className='form-control'
                value={tipoCuenta.nombre}
                onChange={({ target: { value } }) => {
                  setTipoCuenta(() => ({ ...tipoCuenta, nombre: value }))
                }}
              />
              {errors.nombre && (<span>{errors.nombre.message}</span>)}
              <br />
              <button type='submit' className='btn btn-success fs-5'>{titleButton}</button>
            </form>
          </div>
          <div className='col-lg-1 col-sm' />
        </div>
      </div>

    </>
  )
}
