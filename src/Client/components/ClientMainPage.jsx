import { useContext } from 'react'
import { Card } from '../../global/components/Card'
import { ClientNavBar } from './ClientNavBar'
import { UserContext } from '../../context/UserContext'

export const ClientMainPage = () => {
  const { usdValue, eurValue } = useContext(UserContext)

  return (
    <>
      <ClientNavBar />
      <div className='container'>
        <div className='row pt-5'>
          <div className='container'>
            <div className='row'>
              <div className='col-1' />
              <div className='col-5 txt-secondary fs-3'>
                USD: {usdValue.toFixed(2)}
              </div>
              <div className='col-5 txt-secondary fs-3'>
                EUR: {eurValue.toFixed(2)}
              </div>
              <div className='col-1' />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <section className='blog-list px-3 py-5 p-md-5'>
              <div className='container single-col-max-width'>

                <Card
                  title='Ver mi perfil'
                  img='https://images.vexels.com/media/users/3/136638/isolated/preview/8794edc043ac61418c90043b1ed63f2b-purple-flower-icon.png'
                  URL='/user-perfil'
                  destiny='Mi perfil'
                />

                <Card
                  title='Ver mis cuentas'
                  img='https://cdn-icons-png.flaticon.com/512/826/826981.png'
                  URL='/user-cuentas'
                  destiny='Mis cuentas'
                />

                <Card
                  title='Acceder a mi historial'
                  img='https://i.pinimg.com/564x/91/19/64/91196488b4a4e4cb5b1b38ff9ae61861.jpg'
                  URL='/user-historial'
                  destiny='Mi historial'
                />

                <Card
                  title='Realizar transacción'
                  img='https://cdn-icons-png.flaticon.com/256/3021/3021238.png'
                  URL='/user-transaction'
                  destiny='Transacción'
                />

                <Card
                  title='Añadir favorito'
                  img='https://cdn-icons-png.flaticon.com/512/6080/6080679.png'
                  URL='/user-favoritos'
                  destiny='Mis favoritos'
                />

              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
