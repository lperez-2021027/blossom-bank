import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { formOptions, sendData } from '../helpers/ClientFormFavoritoHelper'
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom'
import { ClientNavBar } from '../components/ClientNavBar'
import { obtenerTiposCuentas } from '../../Admin/api/apiCuentas'

export const ClientFormFavorito = ({ favoritoProp, titleButton, option }) => {
  const [favorito, setFavorito] = useState(favoritoProp)
  const [tipoCuenta, setTipoCuenta] = useState([])
  const [idTipoCuent, setIdTipoCuenta] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm(formOptions)

  const fetchData = async () => {
    try {
      const data = await obtenerTiposCuentas()
      setTipoCuenta(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setFavorito({ ...favorito })
    fetchData()
  }, [])

  const crud = async () => {
    await sendData(favorito, option)
  }
  return (

    <>
      <div>
        {
          (option === 1) ? <ClientNavBar /> : null
        }
      </div>

      <div className='container '>
        <div className='row'>
          <div className='col-lg-1 col-sm' />
          <div className='col-lg-10 col-sm-12'>
            <div>      {
              (option === 1) ? <h2 className='txt-secondary py-4'>Agregar Favorito </h2> : <h2>Editar Favorito</h2>
            }
            </div>
            <form onSubmit={handleSubmit(crud)}>
              <div className='form-group mb-3'>
                <label className='text-black txt-list'>Alias de usuario</label>
                <input
                  {...register('alias')}
                  type='text'
                  className='form-control'
                  value={favorito.alias}
                  required
                  onChange={({ target: { value } }) =>
                    setFavorito(() => ({ ...favorito, alias: value }))}
                />
                {errors.alias && (
                  <span className='text-danger'>{errors.alias.message}</span>
                )}
              </div>
              <div className='form-group mb-3'>
                <label className='text-black txt-list'>No Cuenta</label>
                <input
                  {...register('noCuenta')}
                  type='text'
                  className='form-control'
                  value={favorito.noCuentaFav}
                  required
                  onChange={({ target: { value } }) =>
                    setFavorito(() => ({ ...favorito, noCuentaFav: value }))}
                />
                {errors.noCuenta && (
                  <span className='text-danger'>{errors.noCuenta.message}</span>
                )}
              </div>
              <div className='mb-3 form-group mb-3'>
                <label className='form-label fs-6 txt-list'>Tipo de cuenta</label>
                <select
                  className='form-control'
                  value={idTipoCuent}
                  onChange={(e) => {
                    setIdTipoCuenta(e.target.value)
                    setFavorito(() => ({ ...favorito, idTipoCuenta: e.target.value }))
                  }}
                  required
                >
                  <option value=''>Selecciona el tipo de cuenta</option>
                  {tipoCuenta?.map((tipoCuent) => (
                    <option key={tipoCuent._id} value={tipoCuent._id}>
                      {tipoCuent.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <button type='submit' className='btn btn-success fs-7 txt-buttons '>
                {titleButton}
              </button>
            </form>
          </div>
          <div className='col-lg-1 col-sm' />
        </div>
      </div>
      <footer />
    </>

  )
}
