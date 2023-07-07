import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UpdateRoles } from './UpdateRoles'
import { Roles } from '../models/roles.models'
import { apiRoles, apiRolesDelete } from '../api/apiRoles'
import Swal from 'sweetalert2'
import { AdminNavBar } from './AdminNavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

export const ListRoles = () => {
  const [roles, setRoles] = useState([Roles])
  const [showModal, setShowModal] = useState(false)
  const [listR, setListR] = useState([])

  const viewRolesList = async () => {
    try {
      const response = await apiRoles()
      const roles = response.roles
      if (roles) {
        setListR(roles)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    viewRolesList()
  }, [showModal])

  const handleOpenModal = (r) => {
    setShowModal(true)
    setRoles(r)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const eliminarRol = async (id) => {
    const result = await apiRolesDelete(id)
    if (result) {
      setListR(listR.filter((r) => r._id !== id))
      Swal.fire({
        icon: 'success',
        title: 'Rol Eliminado',
        text: 'Se ha eliminado correctamente',
        showConfirmButton: true,
        confirmButtonText: 'Ok'
      })
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Error',
        text: 'No se ha podido eliminar',
        showConfirmButton: true,
        confirmButtonText: 'Ok'
      })
    }
  }

  return (
    <>
      <AdminNavBar />
      <div className='container'>
        <h2 className='py-4 txt-secondary'>Lista de Roles</h2>
        <button id='btn-agregar' className='btn btn-primary mb-3'>
          <Link id='btn-link' className='nav-link txt-buttons fs-5' to='/AddRoles'>
            Agregar
          </Link>
        </button>
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Nombre </th>
                <th scope='col' />
              </tr>
            </thead>
            <tbody>
              {Array.isArray(listR)
                ? (
                    listR.map((r) => (
                      <tr key={r._id}>
                        <td scope='row'>
                          <textarea cols='5' rows='2' className='form-control' readOnly value={r._id}>
                            {r._id}
                          </textarea>
                        </td>
                        <td>{r.rol}</td>
                        <td>
                          <div>
                            <button
                              className='btn btn-danger mx-1'
                              onClick={() => {
                                eliminarRol(r._id)
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} style={{ color: 'white' }} />
                            </button>
                            <button
                              className='btn btn-warning mx-1 my-1'
                              onClick={() => handleOpenModal(r)}
                            >
                              <FontAwesomeIcon icon={faPen} style={{ color: 'white' }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )
                : (
                  <tr>
                    <td colSpan='4'>Loading Roles...</td>
                  </tr>
                  )}
            </tbody>
          </table>
        </div>
        <UpdateRoles
          rolesEdit={roles}
          isOpen={showModal}
          onClose={() => handleCloseModal()}
        />
      </div>
    </>
  )
}
