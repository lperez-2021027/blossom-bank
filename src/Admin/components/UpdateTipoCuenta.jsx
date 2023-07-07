import React from 'react'
import { FormTipoCuenta } from './FormTipoCuenta'
import { Modal } from 'react-bootstrap'

export const UpdateTipoCuenta = ({ isOpen, onClose, tipoCuentaEdit }) => {
  if (!isOpen) {
    return null
  }
  return (
    <>
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title className='text-dark'>ID: {tipoCuentaEdit._id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormTipoCuenta
            tipoCuentaProp={tipoCuentaEdit}
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
