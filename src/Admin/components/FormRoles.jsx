import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { formOptions, formRoles } from '../helpers/fromRoles'

import { AdminNavBar } from './AdminNavBar'

export const FormRoles = ({ rolesProp, titleButton, option }) => {
  const [roles, setRoles] = useState(rolesProp)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm(formOptions)

  useEffect(() => {
    setRoles({ ...roles })
  }, [])

  const crud = async () => {
    await formRoles(roles, option)
  }
  console.log(roles)
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
            <div>      {
              (option === 1) ? <h2 className='txt-secondary py-4'>Agregar un Rol</h2> : <h2>Editar el rol </h2>
            }
            </div>
            <button id='btn-agregar ' className='btn btn-primary mb-4'>
              <Link id='btn-link' className='nav-link txt-buttons fs-5' to='/listarRoles'>
                Volver
              </Link>
            </button>
            <form className='fs-5' onSubmit={handleSubmit(crud)}>
              <label className='pb-1 txt-secondary'>Nombre del rol</label>
              <input
                {...register('rol')}
                type='text'
                className='form-control'
                value={roles.rol}
                onChange={({ target: { value } }) => {
                  setRoles(() => ({ ...roles, rol: value }))
                }}
              />
              {errors.rol && (<span>{errors.rol.message}</span>)}
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
