import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ClientNavBar } from './ClientNavBar'
import { obtenerCuentaPorIdCliente, obtenerUsuariosCliente, obtenerTiposCuentas } from '../../Admin/api/apiCuentas'

export const CuentaDetailsPage = () => {
  const { accountId } = useParams()
  const [account, setAccount] = useState(null)
  const [userName, setUserName] = useState('')
  const [accountTypeName, setAccountTypeName] = useState('')

  useEffect(() => {
    obtenerCuentaPorIdCliente(accountId)
      .then(data => {
        setAccount(data)

        obtenerUsuariosCliente()
          .then(usuarios => {
            setUserName(usuarios.nombre)
          })
          .catch(error => {
            console.log('Error al obtener los usuarios:', error)
          })

        // Fetch account type name
        obtenerTiposCuentas()
          .then(tiposCuentas => {
            const tipoCuenta = tiposCuentas.find(tipo => tipo._id === data.idTipoCuenta)
            if (tipoCuenta) {
              setAccountTypeName(tipoCuenta.nombre)
            }
          })
          .catch(error => {
            console.log('Error al obtener los tipos de cuenta:', error)
          })
      })
      .catch(error => {
        console.log('Error al obtener la cuenta:', error)
      })
  }, [accountId])

  if (!account) {
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
                          <img src='https://www.westminster.ac.uk/sites/default/public-files/icons/student_record-icon-black.png' alt='Detalle de cuenta' style={{ width: '50%', height: '20%' }} />
                        </div>
                      </div>
                      <div className='form-group row'>
                        <div className='col-md-6'>
                          <label htmlFor='accountNumber'>No. Cuenta:</label>
                          <input type='text' id='accountNumber' className='form-control' value={account.noCuenta} readOnly />
                        </div>
                        <div className='col-md-6'>
                          <label htmlFor='username'>Nombre de usuario:</label>
                          <input type='text' id='username' className='form-control' value={userName} readOnly />
                        </div>
                      </div>
                      <div className='form-group row'>
                        <div className='col-md-6'>
                          <label htmlFor='accountType'>Tipo de cuenta:</label>
                          <input type='text' id='accountType' className='form-control' value={accountTypeName} readOnly />
                        </div>
                        <div className='col-md-6'>
                          <label htmlFor='balance'>Saldo:</label>
                          <input type='text' id='balance' className='form-control' value={account.saldo} readOnly />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
