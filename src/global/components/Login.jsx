import { useState, useContext } from 'react'
import { apiLogin } from '../api/apiLogin'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { UserContext } from '../../context/UserContext'

export const Login = ({ setRol }) => {
  const btnPurple = {
    color: '#ffff',
    backgroundColor: '#4f2361'
  }

  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login } = useContext(UserContext)

  const handleSubmit = async (event) => {
    event.preventDefault() // Para que la pagina no se recarge
    const result = await apiLogin(correo, password)
    if (result) {
      login(result.data.rol)
      setRol(result.data.rol) // Set the role in AppRouter's state
      Swal.fire({
        icon: 'success',
        title: 'Los datos ingresados son correctos',
        text: 'Ha iniciado sesion correctamente',
        confirmButtonText: 'Ok'
      }).then((r) => {
        if (r.isConfirmed) {
          if (result.data.rol === 'ROL_CLIENTE') {
            navigate('/user')
          } else if (result.data.rol === 'ROL_ADMIN') {
            navigate('/admin')
          }
        }
      })
    }
  }

  return (
    <>
      <section className='vh-100'>
        <div className='container h-100'>
          <div className='row d-flex align-items-center justify-content-center h-100'>
            <div className='col-md-8 col-lg-7 col-xl-6'>
              {/* <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg' className='img-fluid' alt='Log-in image' /> */}
              {/* <img src='https://i.pinimg.com/750x/4f/b8/e9/4fb8e915d0d8f0dab9e4ebad7754010f.jpg' className='img-fluid' alt='Log-in image' /> */}
              <img src='https://i.pinimg.com/originals/da/6c/f0/da6cf0bb3696347dfae8b5646d2ef35a.png' className='img-fluid' alt='Log-in image' />
            </div>
            <div className='col-md-7 col-lg-5 col-xl-5 offset-xl-1 m-1'>
              <form onSubmit={handleSubmit}>
                <div className='form-outline mb-4'>
                  <label className='form-label fs-1'> Inciar sesión </label>
                  <hr />
                </div>

                <div className='form-outline mb-4'>
                  <label className='form-label fs-4'> Correo eléctronico</label>
                  <input
                    className='form-control form-control-lg'
                    type='email'
                    placeholder='Email'
                    id='email'
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>

                <div className='form-outline mb-4'>
                  <label className='form-label fs-4'>Contraseña</label>
                  <input
                    className='form-control form-control-lg'
                    type='password'
                    placeholder='Contraseña'
                    id='password'
                    value={password}
                    onChange={(p) => setPassword(p.target.value)}
                    required
                  />
                </div>

                <div className=' mb-4 text-center'>
                  <button type='submit' className='btn btn-lg btn-block' style={btnPurple}>Ingresar</button>
                </div>

                <hr />

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
