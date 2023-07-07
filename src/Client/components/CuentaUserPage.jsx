import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ClientNavBar } from './ClientNavBar'
import { obtenerTiposCuentas, obtenerMisCuentas } from '../../Admin/api/apiCuentas'

export const CuentaUserPage = () => {
  const [accountTypes, setAccountTypes] = useState([])
  const [userAccounts, setUserAccounts] = useState([])

  useEffect(() => {
    obtenerTiposCuentas()
      .then(data => setAccountTypes(data))
      .catch(error => {
        console.log('Error al obtener los tipos de cuenta:', error)
      })

    obtenerMisCuentas()
      .then(data => setUserAccounts(data))
      .catch(error => {
        console.log('Error al obtener las cuentas del usuario:', error)
      })
  }, [])

  const filteredAccountTypes = accountTypes.filter(type => {
    return userAccounts.some(account => account.idTipoCuenta === type._id)
  })

  const imgStyle = {
    width: '100%',
    height: 'auto',
    maxWidth: '600px'
  }

  const divContStyle = {
    boxShadow: '11px 14px 25px 1px #9c549c'
  }

  return (
    <>
      <ClientNavBar />
      <div className='container txt-buttons'>
        <div className='row'>
          <div className='col'>
            <section className='blog-list px-3 py-5 p-md-5'>
              <div className='container single-col-max-width'>
                {filteredAccountTypes.length === 0
                  ? (
                    <p>No hay cuentas disponibles.</p>
                    )
                  : (
                      filteredAccountTypes.map(type => {
                        let image = ''
                        if (type.nombre === 'Monetaria') {
                          image = 'https://cdn-icons-png.flaticon.com/512/8107/8107512.png'
                        } else if (type.nombre === 'Ahorro') {
                          image = 'https://cdn-icons-png.flaticon.com/512/1320/1320934.png'
                        }

                        const userAccount = userAccounts.find(account => account.idTipoCuenta === type._id)

                        return (
                          <div className='item mb-5 container text-center' style={divContStyle} key={type._id}>
                            <div className='row g-3 g-xl-0 align-items-center'>
                              <div className='col-sm-12 col-xl-3'>
                                <img
                                  className='img-fluid post-thumb px-4 py-1'
                                  src={image}
                                  alt={type.nombre}
                                  style={imgStyle}
                                />
                              </div>
                              <div className='col'>
                                <h3 className='title my-1 fs-3'>
                                  {type.nombre}
                                </h3>
                                <Link
                                  to={`/usuario-cuentas/${userAccount._id}`}
                                  className='btn btn-dark p-3 my-5 mx-auto'
                                >
                                  Más información
                                </Link>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
