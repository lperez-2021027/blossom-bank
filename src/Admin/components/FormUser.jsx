import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { formOptions, sendData } from '../../global/helpers/formUserHelper'
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom'
import { AdminNavBar } from '../components/AdminNavBar'

export const FormUser = ({ userProp, titleButton, option }) => {
  const [usuario, setUser] = useState(userProp)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm(formOptions)

  useEffect(() => {
    setUser({ ...usuario, password: '' })
  }, [])

  const crud = async () => {
    console.log('crud en admin')
    await sendData(usuario, option)
  }

  return (

    <>
      <div>
        {
          (option === 1) ? <AdminNavBar /> : null
        }
      </div>

      <div className='container '>
        <div className='row'>
          <div className='col-lg-1 col-sm' />
          <div className='col-lg-10 col-sm-12'>
            <div>      {
              (option === 1) ? <h2 className='txt-secondary py-4'>Agregar Usuarios </h2> : <h2>Editar Usuario</h2>
            }
            </div>
            <form onSubmit={handleSubmit(crud)} className='fs-5'>
              <div className='form-group m-1'>
                <label className='text-black '>Nombre de usuario</label>
                <input
                  {...register('nombre')}
                  type='text'
                  className='form-control'
                  value={usuario.nombre}
                  required
                  onChange={({ target: { value } }) =>
                    setUser(() => ({ ...usuario, nombre: value }))}
                />
                {errors.nombre && (
                  <span className='text-danger'>{errors.nombre.message}</span>
                )}
              </div>
              <div className='form-group m-1'>
                <label className='text-black'>Alias </label>
                <input
                  {...register('alias')}
                  type='text'
                  className='form-control'
                  value={usuario.alias}
                  required
                  onChange={({ target: { value } }) =>
                    setUser(() => ({ ...usuario, alias: value }))}
                />
                {errors.alias && (
                  <span className='text-danger'>{errors.alias.message}</span>
                )}
              </div>
              <div className='form-group m-1'>
                <label className='text-black'>Identificacion DPI</label>
                <input
                  {...register('dpi')}
                  type='text'
                  className='form-control'
                  value={usuario.dpi}
                  required
                  onChange={({ target: { value } }) =>
                    setUser(() => ({ ...usuario, dpi: value }))}
                />
                {errors.nombre && (
                  <span className='text-danger'>{errors.dpi.message}</span>
                )}
              </div>
              <div className='form-group m-1'>
                <label className='text-black'> Dirección </label>
                <input
                  {...register('direccion')}
                  type='text'
                  className='form-control'
                  value={usuario.direccion}
                  required
                  onChange={({ target: { value } }) =>
                    setUser(() => ({ ...usuario, direccion: value }))}
                />
                {errors.nombre && (
                  <span className='text-danger'>{errors.direccion.message}</span>
                )}
              </div>
              <div className='form-group m-1'>
                <label className='text-black'> Número telefónico</label>
                <input
                  {...register('celular')}
                  type='text'
                  className='form-control'
                  value={usuario.celular}
                  required
                  onChange={({ target: { value } }) =>
                    setUser(() => ({ ...usuario, celular: value }))}
                />
                {errors.nombre && (
                  <span className='text-danger'>{errors.celular.message}</span>
                )}
              </div>
              <div className='form-group m-1'>
                <label className='text-black'>Correo Electrónico</label>
                <input
                  {...register('correo')}
                  type='email'
                  className='form-control'
                  value={usuario.correo}
                  required
                  onChange={({ target: { value } }) =>
                    setUser(() => ({ ...usuario, correo: value }))}
                />
                {errors.correo && (
                  <span className='text-danger'>{errors.correo.message}</span>
                )}
              </div>
              <div className='form-group m-1'>
                <label className='text-black'>Contraseña</label>
                <input
                  {...register('password')}
                  type='password'
                  className='form-control'
                  value={usuario.password}
                  onChange={({ target: { value } }) =>
                    setUser(() => ({ ...usuario, password: value }))}
                />
                {errors.password && (
                  <span className='text-danger'>{errors.password.message}</span>
                )}
              </div>
              <div className='form-group m-1'>
                <label className='text-black'>Profesión</label>
                <input
                  {...register('profesion')}
                  type='text'
                  className='form-control'
                  value={usuario.profesion}
                  required
                  onChange={({ target: { value } }) =>
                    setUser(() => ({ ...usuario, profesion: value }))}
                />
                {errors.identificacion && (
                  <span className='text-danger'>{errors.profesion.message}</span>
                )}
              </div>
              <div className='form-group m-1'>
                <label className='text-black'>Ingresos</label>
                <input
                  {...register('ingresos')}
                  type='number'
                  min='100'
                  className='form-control'
                  value={usuario.ingresos}
                  onChange={({ target: { value } }) =>
                    setUser(() => ({ ...usuario, ingresos: value }))}
                />
                {errors.nombre && (
                  <span className='text-danger'>{errors.ingresos.message}</span>
                )}
              </div>
              <button type='submit' className='btn btn-success txt-secondary fs-5 my-3'>
                {titleButton}
              </button>
            </form>
            <div className='col-lg-1 col-sm' />
          </div>
        </div>
      </div>
      <footer />
    </>

  )
}
