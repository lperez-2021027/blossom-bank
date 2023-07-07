/* eslint-disable react/jsx-closing-tag-location */
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { DeleteUSer, apiUsuarios } from '../api/apiUsuarios'
import { Usarios } from '../../global/models/ModelUser'
import { AdminNavBar } from '../components/AdminNavBar'
import Swal from 'sweetalert2'
import { UpdateUser } from './UpdateUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

export const ListaUsuarios = () => {
  const [listaUsuariosA, setListaUsuariosA] = useState([])
  const [user, setUser] = useState(Usarios)
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const viewUsuariosList = async () => {
    const getListUsuariosFromApi = await apiUsuarios()
    setListaUsuariosA(getListUsuariosFromApi)
  }

  const handleOpenModal = (u) => {
    setShowModal(true)
    setUser(u)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    viewUsuariosList()
  }, [showModal])

  const eliminar = async (id) => {
    const result = await DeleteUSer(id)
    if (result) {
      setListaUsuariosA(listaUsuariosA.filter((u) => u._id !== id))
      Swal.fire({
        icon: 'success',
        title: 'Genial!',
        text: 'Se eliminó el usuario correctamente!'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo eliminar el usuario!'
      })
    }
  }

  return (
    <>
      <AdminNavBar />
      <div className='container'>
        <h2 className='py-4 txt-secondary'>Lista de usuarios</h2>
        <button id='btn-agregar ' className='btn btn-primary mb-3 '>
          <Link id='btn-link' className='nav-link txt-buttons fs-5' to='/agregarUsuarioAdmin'>
            Agregar
          </Link>
        </button>
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Nombre</th>
                <th scope='col'>Alias</th>
                <th scope='col'>DPI</th>
                <th scope='col'>Direccion</th>
                <th scope='col'>Celular</th>
                <th scope='col'>Correo</th>
                <th scope='col'>Profesion</th>
                <th scope='col'>Ingresos</th>
                <th scope='col'>Rol</th>
                <th scope='col' />
              </tr>
            </thead>
            <tbody>
              {listaUsuariosA?.map((u) => {
                return (

                  <tr key={u._id}>
                    <th scope='row'>
                      <textarea cols='5' rows='1' className='form-control' value={u._id} readOnly>{u._id}</textarea>
                    </th>

                    <td>{u.nombre}</td>
                    <td>{u.alias}</td>
                    <td>{u.dpi}</td>
                    <td>{u.direccion}</td>
                    <td>{u.celular}</td>
                    <td>{u.correo}</td>
                    <td>{u.profesion}</td>
                    <td>{u.ingresos}</td>
                    <td>{u.rol}</td>
                    <td>
                      {(u.rol === 'ROL_ADMIN')
                        ? null
                        : <div>
                          <button
                            className='btn btn-danger mx-1'
                            onClick={() => {
                              eliminar(u._id)
                            }}
                          ><FontAwesomeIcon icon={faTrash} style={{ color: 'white' }} />
                          </button>
                          <button
                            className='btn btn-warning mx-1 my-1'
                            onClick={() => handleOpenModal(u)}
                          >
                            <FontAwesomeIcon icon={faPen} style={{ color: 'white' }} />
                          </button>
                        </div>}

                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <UpdateUser
          userEdit={user}
          isOpen={showModal}
          onClose={() => handleCloseModal()}
        />
      </div>
    </>
  )
}
