import React from 'react'
import { Modal } from 'react-bootstrap'
import { ClientFormFavorito } from './ClientFormFavorito'
export const ClientUpdateFavorito = ({ favoritoEdit, isOpen, onClose }) => {
  if (!isOpen) {
    return null
  }

  return (
    <>
      <>
        <Modal show={isOpen}>
          <Modal.Header>
            <Modal.Title className='text-dark'>ID: {favoritoEdit._id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ClientFormFavorito
              favoritoProp={favoritoEdit}
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
    </>
  )
}
