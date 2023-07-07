import React from 'react'
import { FormRoles } from './FormRoles'
import { Modal } from 'react-bootstrap'

export const UpdateRoles = ({ isOpen, onClose, rolesEdit }) => {
  if (!isOpen) {
    return null
  }
  return (
    <>
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title className='text-dark'>ID: {rolesEdit._id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormRoles
            rolesProp={rolesEdit}
            titleButton='Actualizar'
            option={2}
          />
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-danger' onClick={onClose}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
