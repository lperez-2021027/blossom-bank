import React from 'react'
import { FormUser } from '../components/FormUser'
import { Usarios } from '../../global/models/ModelUser'

export const CreateUser = () => {
  return (
    <>
      <FormUser
        userProp={Usarios}
        titleButton='Crear Usuario'
        option={1}
      />
    </>
  )
}
