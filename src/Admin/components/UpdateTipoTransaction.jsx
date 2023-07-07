import React from 'react'
import { FormTipoTransaction } from './FormTipoTransaction'
import { Modal } from 'react-bootstrap'

export const UpdateTipoTransaction = ({ isOpen, onClose, tipoTransactionEdit }) => {
  if (!isOpen) {
    return null
  }
  return (
    <>
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title className='text-dark'>ID: {tipoTransactionEdit._id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormTipoTransaction
            tipoTransactionProp={tipoTransactionEdit}
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
