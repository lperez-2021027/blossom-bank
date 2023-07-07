import { useEffect, useState } from 'react'
import { apiTipoTransaction, apiTipoTransactionDelete } from '../api/apiTipoTransaction'
import { Link } from 'react-router-dom'
import { UpdateTipoTransaction } from './UpdateTipoTransaction'
import { TipoTransaction } from '../models/tipoTransaction.models'

import Swal from 'sweetalert2'
import { AdminNavBar } from './AdminNavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

export const ListTipoTransaction = () => {
  const [tipoTransaction, setTipoTransaction] = useState(TipoTransaction)

  const [showModal, setShowModal] = useState(false)

  // Estado de usuarios en la lista de forma independiente
  const [listTT, setListTT] = useState([])

  const viewTipoTransactionList = async () => {
    const getListTTFromAPI = await apiTipoTransaction()

    setListTT(getListTTFromAPI)
  }

  // UseEffect crea efectos secundarios, en este caso al momento de renderizar la tabla
  useEffect(() => {
    viewTipoTransactionList()
  }, [showModal])

  // modal
  const handleOpenModal = (h) => {
    setShowModal(true)
    setTipoTransaction(h)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const eliminarTipoTransaction = async (id) => {
    const result = await apiTipoTransactionDelete(id)
    if (result) {
      setListTT(listTT.filter((h) => h._id !== id))
      Swal.fire({
        icon: 'success',
        title: 'Tipo de Transaccion Eliminado',
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
        <h2 className='py-4 txt-secondary'>Lista de los tipos de transacción</h2>
        <button id='btn-agregar ' className='btn btn-primary mb-3'>
          <Link id='btn-link' className='nav-link txt-buttons fs-5' to='/AddTipoTransaction'>
            Agregar
          </Link>
        </button>
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Nombre</th>
                <th scope='col' />
              </tr>
            </thead>
            <tbody>
              {listTT.map((h) => {
                return (

                  <tr key={h._id}>
                    <th scope='row'>
                      <textarea cols='5' rows='2' className='form-control' readOnly value={h._id}>
                        {h._id}
                      </textarea>
                    </th>

                    <td>{h.nombre}</td>
                    <td>

                      <div>
                        <button
                          className='btn btn-danger mx-1'
                          onClick={() => {
                            eliminarTipoTransaction(h._id)
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
        <UpdateTipoTransaction
          tipoTransactionEdit={tipoTransaction}
          isOpen={showModal}
          onClose={() => handleCloseModal()}
        />
      </div>
    </>
  )
}
