import { useEffect, useState } from 'react'
import { apiTipoCuenta, apiTipoCuentaDelete } from '../api/apiTipoCuenta'
import { Link } from 'react-router-dom'
import { UpdateTipoCuenta } from './UpdateTipoCuenta'
import { TipoCuenta } from '../models/tipoCuenta.models'

import Swal from 'sweetalert2'
import { AdminNavBar } from './AdminNavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

export const ListTipoCuenta = () => {
  const [tipoCuenta, setTipoCuenta] = useState(TipoCuenta)

  const [showModal, setShowModal] = useState(false)

  // Estado de usuarios en la lista de forma independiente
  const [listTC, setListTC] = useState([])

  const viewTipoCuentaList = async () => {
    const getListTCFromAPI = await apiTipoCuenta()

    setListTC(getListTCFromAPI)
  }

  useEffect(() => {
    viewTipoCuentaList()
  }, [showModal])

  const handleOpenModal = (h) => {
    setShowModal(true)
    setTipoCuenta(h)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const eliminarTipoCuenta = async (id) => {
    const result = await apiTipoCuentaDelete(id)
    if (result) {
      setListTC(listTC.filter((h) => h._id !== id))
      Swal.fire({
        icon: 'success',
        title: 'Tipo de Cuenta Eliminado',
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
        <h2 className='py-4 txt-secondary'>Lista de los tipos de cuentas</h2>
        <button id='btn-agregar ' className='btn btn-primary mb-3'>
          <Link id='btn-link' className='nav-link txt-buttons fs-5' to='/AddTipoCuenta'>
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
              {listTC.map((h) => {
                return (

                  <tr key={h._id}>
                    <td scope='row'>
                      <textarea cols='5' rows='2' className='form-control' readOnly value={h._id}>
                        {h._id}
                      </textarea>
                    </td>

                    <td>{h.nombre}</td>
                    <td>

                      <div>
                        <button
                          className='btn btn-danger mx-1'
                          onClick={() => {
                            eliminarTipoCuenta(h._id)
                          }}
                        ><FontAwesomeIcon icon={faTrash} style={{ color: 'white' }} />
                        </button>
                        <button
                          className='btn btn-warning mx-1 my-1'
                          onClick={() => handleOpenModal(h)}
                        >
                          <FontAwesomeIcon icon={faPen} style={{ color: 'white' }} />
                        </button>
                      </div>

                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <UpdateTipoCuenta
          tipoCuentaEdit={tipoCuenta}
          isOpen={showModal}
          onClose={() => handleCloseModal()}
        />
      </div>
    </>
  )
}
