import React from 'react'
import { ClientFormFavorito } from '../components/ClientFormFavorito'
import { Favoritos } from '../../Client/models/ModelFavoritos'

export const ClientCreateFavorito = () => {
  return (
    <>
      <ClientFormFavorito
        favoritoProp={Favoritos}
        titleButton='Crear Favorito'
        option={1}
      />
    </>
  )
}
