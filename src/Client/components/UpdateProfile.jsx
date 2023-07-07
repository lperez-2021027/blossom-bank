import React from 'react'
import { Modal } from 'react-bootstrap'
import { FormUser } from './FormUser'
export const UpdateProfile = ({ isOpen, onClose, userEdit }) => {
  if (!isOpen) {
    return null
  }
  const handleModalClose = () => {
    onClose()
    window.location.reload() // Recargar la página al cerrar el modal
  }

  return (
    <>
      <>
        <Modal show={isOpen}>
          <Modal.Header>
            <Modal.Title className='text-dark'>ID: {userEdit._id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormUser
              userProp={userEdit}
              titleButton='Actualizar Perfil'
              option={3}
            />
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-danger' onClick={handleModalClose}>
              Cerrar
            </button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  )
}
