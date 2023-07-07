import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ClientNavBar } from './ClientNavBar'
import { obtenerCliente } from '../api/apiUsuarios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { UpdateProfile } from './UpdateProfile'

export const ClientProfile = () => {
  const { clienteId } = useParams()
  const [cliente, setCliente] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const handleOpenModal = (cliente) => {
    setShowModal(true)
    setCliente(cliente)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    showModal
    obtenerCliente(clienteId)
      .then(data => {
        setCliente(data)
      })
  }, [clienteId])

  if (!cliente) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ClientNavBar />
      <div className='user-detail-container'>
        <div className='user-detail'>
          <div className='upper-card'>
            <div className='row'>
              <div className='col-md-6 mx-auto'>
                <div style={{ marginTop: '40px' }}>
                  <div className='card user-detail-card text-center' data-mh='card-one' style={{ padding: '20px' }}>
                    <div className='card user-detail-card text-center' data-mh='card-one' style={{ padding: '20px' }}>
                      <div className='form-group'>
                        <div style={{ marginBottom: '30px' }}>
                          <FontAwesomeIcon icon={faCircleUser} size='10x' />
                        </div>
                      </div>
                      <div className='form-group row m-2'>
                        <div className='col-md-6 txt-options'>
                          <label htmlFor='accountNumber'>ID:</label>
                          <input type='text' className='form-control txt-buttons' value={cliente._id} readOnly />
                        </div>
                        <div className='col-md-6 txt-options'>
                          <label htmlFor='username'>Nombre :</label>
                          <input type='text' className='form-control txt-buttons' value={cliente.nombre} readOnly />
                        </div>
                      </div>
                      <div className='form-group row m-2'>
                        <div className='col-md-6 txt-options'>
                          <label htmlFor='accountType'> Alias:</label>
                          <input type='text' className='form-control txt-buttons' value={cliente.alias} readOnly />
                        </div>
                        <div className='col-md-6 txt-options'>
                          <label htmlFor='balance'> Dpi :</label>
                          <input type='text' className='form-control txt-buttons' value={cliente.dpi} readOnly />
                        </div>
                      </div>
                      <div className='form-group row m-2'>
                        <div className='col-md-6 txt-options'>
                          <label htmlFor='accountType'> Direccion :</label>
                          <input type='text' className='form-control txt-buttons' value={cliente.direccion} readOnly />
                        </div>
                        <div className='col-md-6 txt-options'>
                          <label htmlFor='balance'> Celular:</label>
                          <input type='text' className='form-control txt-buttons' value={cliente.celular} readOnly />
                        </div>
                      </div>
                      <div className='form-group row m-2'>
                        <div className='col-md-6 txt-options'>
                          <label htmlFor='accountType'>Correo:</label>
                          <input type='email' className='form-control txt-buttons' value={cliente.correo} readOnly />
                        </div>
                        <div className='col-md-6 txt-options'>
                          <label htmlFor='accountType'>Profesion:</label>
                          <input type='text' className='form-control txt-buttons' value={cliente.profesion} readOnly />
                        </div>
                      </div>
                      <div className='form-group row m-2'>
                        <div className='col-md-6 txt-optionss'>
                          <label htmlFor='balance'>Ingresos:</label>
                          <input type='number' className='form-control txt-buttons' value={cliente.ingresos} readOnly />
                        </div>
                        <div className='col-md-6 txt-buttons'>
                          <button
                            className='btn btn-primary mb-3'
                            onClick={() => handleOpenModal(cliente)}
                          > Editar celular , alias o Contraseña
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <UpdateProfile
                  userEdit={cliente}
                  isOpen={showModal}
                  onClose={() => handleCloseModal()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
