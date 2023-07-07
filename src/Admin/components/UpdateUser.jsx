import React from 'react'
import { Modal } from 'react-bootstrap'
import { FormUser } from './FormUser'
export const UpdateUser = ({ isOpen, onClose, userEdit }) => {
  if (!isOpen) {
    return null
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
              titleButton='Actualizar'
              option={2}
            />
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-danger txt-buttons' onClick={onClose}>
              Cerrar
            </button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  )
}
