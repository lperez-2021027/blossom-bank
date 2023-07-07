import { Card } from '../../global/components/Card'
import { AdminNavBar } from './AdminNavBar'

export const AdminMainPage = () => {
  return (
    <>
      <AdminNavBar />
      <br />
      <div className='container'>
        <div className='row'>
          <div className='col' />
          <div className='col-6 text-center p-0 m-0 txt-secondary'>
            <h2 className='m-0 txt-options'>Opciones del administrador</h2>
          </div>
          <div className='col' />
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col' />
          <div className='col-6 text-center'>
            <img src='https://i.pinimg.com/564x/8d/f4/34/8df4346f39b68d2ee0b504f06de09951.jpg' width='200' height='80' />
          </div>
          <div className='col' />
        </div>
      </div>
      <hr />
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <section className='blog-list px-3 py-5 p-md-5 '>
              <div className='container single-col-max-width '>

                <Card
                  title='Administrar Cuentas'
                  img='https://cdn-icons-png.flaticon.com/512/826/826981.png'
                  URL='/admin-cuentas'
                  destiny='Cuentas'
                />

                <Card
                  title='Administrar usuarios'
                  img='https://i.pinimg.com/564x/91/19/64/91196488b4a4e4cb5b1b38ff9ae61861.jpg'
                  URL='/admin-usuarios'
                  destiny='Usuarios'
                />

                <Card
                  title='Administrar los tipos de cuenta'
                  img='https://images.vexels.com/media/users/3/136638/isolated/preview/8794edc043ac61418c90043b1ed63f2b-purple-flower-icon.png'
                  URL='/listarTipoCuenta'
                  destiny='Tipos de cuenta'
                />

                <Card
                  title='Administrar los tipos de transacciones'
                  img='https://cdn-icons-png.flaticon.com/256/3021/3021238.png'
                  URL='/listarTipoTransaction'
                  destiny='Tipos de transacciones'
                />

                <Card
                  title='Administrar los roles'
                  img='https://cdn-icons-png.flaticon.com/512/6080/6080679.png'
                  URL='/listarRoles'
                  destiny='Roles'
                />

              </div>
            </section>
          </div>
        </div>
      </div>

    </>
  )
}
