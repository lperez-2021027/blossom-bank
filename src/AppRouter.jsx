import { Route, Routes, Navigate } from 'react-router-dom'
import { UserProvider } from './context/UserProvider'
import { useState, useEffect } from 'react'

// Importaciones Global
import { Login } from './global/components/Login'

// Importaciones Client
import { ClientMainPage } from './Client/components/ClientMainPage'
import { AdminMainPage } from './Admin/components/AdminMainPage'
import { CuentaAdminPage } from './Admin/components/CuentaAdminPage'
import { ClientTransaction } from './Client/components/ClientTransaction'
import { ClientHistorial } from './Client/components/ClientHistorial'
import { CuentaUserPage } from './Client/components/CuentaUserPage'
import { CuentaDetailsPage } from './Client/components/CuentaDetailsPage'
import { ListaUsuarios } from './Admin/components/UsuariosAdminPage'
import { CreateUser } from './Admin/components/CreateUser'
import { ClientProfile } from './Client/components/ClientProfile'
import { ClientCreateFavorito } from './Client/components/ClientCreateFavorito'
import { ListaFavoritos } from './Client/components/ClientFavoritos'
import { ListTipoCuenta } from './Admin/components/ListTipoCuenta'
import { CreateTipoCuenta } from './Admin/components/CreateTipoCuenta'
import { ListRoles } from './Admin/components/ListRoles'
import { CreateRoles } from './Admin/components/CreateRoles'
import { CreateTipoTransaction } from './Admin/components/CreateTipoTransaction'
import { ListTipoTransaction } from './Admin/components/ListTipoTransaction'
import { NotFound } from './global/components/NotFound'

export const AppRouter = () => {
  // eslint-disable-next-line no-undef
  const [rol, setRol] = useState(() => localStorage.getItem('rol'))

  useEffect(() => {
    // eslint-disable-next-line no-undef
    localStorage.setItem('rol', rol)
  }, [rol])

  const isClientAuth = (requiredRol) => {
    return rol === requiredRol
  }

  const isAdminAuth = () => {
    return rol === 'ROL_ADMIN'
  }

  return (
    <>
      <UserProvider>
        <Routes>
          {/* Rutas Globales */}z
          <Route path='/' element={<Login setRol={setRol} />} />
          <Route path='/*' element={<NotFound />} />

          {/* Rutas para Client */}
          <Route
            path='/user'
            element={isClientAuth('ROL_CLIENTE') ? <ClientMainPage /> : <Navigate to='/' />}
          />
          <Route
            path='/user-perfil'
            element={isClientAuth('ROL_CLIENTE') ? <ClientProfile /> : <Navigate to='/' replace />}
          />
          <Route
            path='/user-historial'
            element={isClientAuth('ROL_CLIENTE') ? <ClientHistorial /> : <Navigate to='/' replace />}
          />
          <Route
            path='/user-transaction'
            element={isClientAuth('ROL_CLIENTE') ? <ClientTransaction /> : <Navigate to='/' replace />}
          />
          <Route
            path='/user-cuentas'
            element={isClientAuth('ROL_CLIENTE') ? <CuentaUserPage /> : <Navigate to='/' replace />}
          />
          <Route
            path='/usuario-cuentas/:accountId'
            element={isClientAuth('ROL_CLIENTE') ? <CuentaDetailsPage /> : <Navigate to='/' replace />}
          />
          <Route
            path='/user-favoritos'
            element={isClientAuth('ROL_CLIENTE') ? <ListaFavoritos /> : <Navigate to='/' replace />}
          />
          <Route
            path='/agregarFavorito'
            element={isClientAuth('ROL_CLIENTE') ? <ClientCreateFavorito /> : <Navigate to='/' replace />}
          />

          {/* Rutas para Admin */}
          <Route
            path='/admin'
            element={isAdminAuth() ? <AdminMainPage /> : <Navigate to='/' replace />}
          />
          <Route
            path='/admin-cuentas'
            element={isAdminAuth() ? <CuentaAdminPage /> : <Navigate to='/' replace />}
          />
          <Route
            path='/admin-usuarios'
            element={isAdminAuth() ? <ListaUsuarios /> : <Navigate to='/' replace />}
          />
          <Route
            path='/agregarUsuarioAdmin'
            element={isAdminAuth() ? <CreateUser /> : <Navigate to='/' replace />}
          />
          <Route
            path='/listarTipoCuenta'
            element={isAdminAuth() ? <ListTipoCuenta /> : <Navigate to='/' replace />}
          />
          <Route
            path='/AddTipoCuenta'
            element={isAdminAuth() ? <CreateTipoCuenta /> : <Navigate to='/' replace />}
          />
          <Route
            path='/listarRoles'
            element={isAdminAuth() ? <ListRoles /> : <Navigate to='/' replace />}
          />
          <Route
            path='/AddRoles'
            element={isAdminAuth() ? <CreateRoles /> : <Navigate to='/' replace />}
          />
          <Route
            path='/listarTipoTransaction'
            element={isAdminAuth() ? <ListTipoTransaction /> : <Navigate to='/' replace />}
          />
          <Route
            path='/AddTipoTransaction'
            element={isAdminAuth() ? <CreateTipoTransaction /> : <Navigate to='/' replace />}
          />
        </Routes>
      </UserProvider>
    </>
  )
}
