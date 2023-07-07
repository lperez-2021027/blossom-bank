import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { formOptions, sendData } from '../../global/helpers/formUserHelper'
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom'

export const FormUser = ({ userProp, titleButton, option }) => {
  const [usuario, setUser] = useState(userProp)
  const {
    register,
    formState: { errors }
  } = useForm(formOptions)

  useEffect(() => {
    setUser({ ...usuario, password: '' })
  }, [])

  const crud = async () => {
    try {
      console.log('metodo crud CLIENTE')
      await sendData(usuario, option)
    } catch (error) {
      console.log(error)
    }
  }
  const handleFormSubmit = (event) => {
    event.preventDefault() // Evita el comportamiento por defecto del envío del formulario
    crud() // Llama a tu función crud directamente
  }

  return (

    <>

      <div className='container '>
        <div className='row'>
          <div className='col-2' />
          <div className='col-6'>
            <div>
              <h2>Editar Perfil</h2>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className='form-group'>
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
                  <span className='text-danger'>{errors}</span>
                )}
              </div>
              <div className='form-group'>
                <label className='text-black'> Numero de celular</label>
                <input
                  {...register('celular')}
                  type='text'
                  className='form-control'
                  value={usuario.celular}
                  required
                  onChange={({ target: { value } }) =>
                    setUser(() => ({ ...usuario, celular: value }))}
                />
                {errors.celular && (
                  <span className='text-danger'>{errors.celular.message}</span>
                )}
              </div>
              <div className='form-group'>
                <label className='text-black'>Contraseña</label>
                <input
                  {...register('password')}
                  type='password'
                  className='form-control'
                  value={usuario.password}
                  required
                  onChange={({ target: { value } }) =>
                    setUser(() => ({ ...usuario, password: value }))}
                />
                {errors.password && (
                  <span className='text-danger'>{errors}</span>
                )}
              </div>
              <button type='submit' className='btn btn-success mt-3' onClick={() => { console.log('hollaaa') }}>
                {titleButton}
              </button>
            </form>
            <div className='col' />
          </div>
        </div>
      </div>
      <footer />
    </>

  )
}
