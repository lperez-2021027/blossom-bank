import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import '../../global/assets/style.css'

export const AdminNavBar = () => {
  const navPurple = {
    backgroundColor: '#4f2361'
  }

  const { logout } = useContext(UserContext)
  const navigate = useNavigate()

  const onLogOut = () => {
    logout()
    // navegamos al login
    navigate('/', {
      replace: true
    })
  }

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary p-0' style={navPurple} data-bs-theme='dark'>
      <div className='container-fluid p-4' style={navPurple}>

        <Link className='navbar-brand fs-2 mx-3 d-flex' to='/admin'>
          <img
            src='https://cdn0.iconfinder.com/data/icons/nature-life-in-color/128/peach-blossom-128.png'
            alt='a'
            height='50px'
            className='mx-3'
          />
          <p className='m-0 txt-logo'>Blossom bank</p>
        </Link>

        <button
          className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'
          aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse ' id='navbarNav'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link to='/admin' className='nav-link fs-4 txt-options' aria-current='page'>
                Opciones
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/admin-cuentas' className='nav-link fs-4 txt-options' aria-current='page'>
                Cuentas
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/admin-usuarios' className='nav-link fs-4 txt-options' aria-current='page'>
                Usuarios
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/listarTipoCuenta' className='nav-link fs-4 txt-options' aria-current='page'>
                Tipo Cuenta
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/listarTipoTransaction' className='nav-link fs-4 txt-options' aria-current='page'>
                Tipo Transaccion
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/listarRoles' className='nav-link fs-4 txt-options' aria-current='page'>
                Roles
              </Link>
            </li>
          </ul>
          <form className='d-flex' onSubmit={onLogOut}>
            <button className='btn btn-dark fs-5 txt-secundary ' type='submit'>Cerrar sesión</button>
          </form>
        </div>
      </div>
    </nav>

  )
}
