import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { eliminarFavorito, obtenerFavoritos } from '../api/apiFavoritos'
import { Favoritos } from '../models/ModelFavoritos'
import { ClientNavBar } from '../components/ClientNavBar'
import Swal from 'sweetalert2'
import { ClientUpdateFavorito } from './ClientUpdateFavorito'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

export const ListaFavoritos = () => {
  const [listaFavoritosA, setListaFavoritosA] = useState([])
  const [favorito, setFavorito] = useState(Favoritos)
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const viewFavoritosList = async () => {
    try {
      const { favoritos } = await obtenerFavoritos()
      setListaFavoritosA(favoritos)
    } catch (error) {
      console.log('Error al obtener los favoritos:', error)
      // Manejar el error adecuadamente
    }
  }

  const handleOpenModal = (u) => {
    setShowModal(true)
    setFavorito(u)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    viewFavoritosList()
  }, [showModal])

  const eliminar = async (id) => {
    const result = await eliminarFavorito(id)
    if (result) {
      setListaFavoritosA(listaFavoritosA.filter((u) => u._id !== id))
      Swal.fire({
        icon: 'success',
        title: 'Genial!',
        text: 'Se eliminó el favorito correctamente!'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo eliminar el favorito!'
      })
    }
  }
  return (
    <>
      <ClientNavBar />
      <div className='container'>
        <h2 className='py-4 txt-secondary'>Lista de mis favoritos</h2>
        <button id='btn-agregar' className='btn btn-primary mb-3'>
          <Link id='btn-link' className='nav-link txt-buttons fs-5' to='/agregarFavorito'>
            Agregar
          </Link>
        </button>
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>Alias</th>
                <th scope='col'>No de Cuenta</th>
                <th scope='col'>Tipo de Cuenta</th>
                <th scope='col' />
              </tr>
            </thead>
            <tbody>
              {Array.isArray(listaFavoritosA)
                ? (
                    listaFavoritosA.map((u) => (
                      <tr key={u._id}>
                        <td>{u.alias}</td>
                        <td>{u.noCuentaFav}</td>
                        <td>{u.idTipoCuenta.nombre}</td>
                        <td>
                          {(u.rol === 'ROL_CLIENTE')
                            ? null
                            : (
                              <div>
                                <button
                                  className='btn btn-danger mx-1'
                                  onClick={() => {
                                    eliminar(u._id)
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrash} style={{ color: 'white' }} />
                                </button>
                                <button
                                  className='btn btn-warning mx-1 my-1'
                                  onClick={() => handleOpenModal(u)}
                                >
                                  <FontAwesomeIcon icon={faPen} style={{ color: 'white' }} />
                                </button>
                              </div>
                              )}
                        </td>
                      </tr>
                    ))
                  )
                : (
                  <tr>
                    <td colSpan='4'>Loading favoritos...</td>
                  </tr>
                  )}
            </tbody>
          </table>
        </div>
        <ClientUpdateFavorito
          favoritoEdit={favorito}
          isOpen={showModal}
          onClose={() => handleCloseModal()}
        />
      </div>
    </>
  )
}
