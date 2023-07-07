export const isUserAuth = () => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token')

  if (token) {
    return true
  }

  return false
}

export const isAdminAuth = () => {
  // eslint-disable-next-line no-undef

  // eslint-disable-next-line no-undef
  const rol = localStorage.getItem('rol')
  console.log(rol)

  if (isUserAuth && rol === 'ROL_ADMIN') {
    return true
  }
  return false
  // return isUserAuth('ROL_ADMIN')
}

export const isClientAuth = (rol = '') => {
  // return isUserAuth('ROL_CLIENTE')

  console.log(rol)

  if (rol === 'ROL_CLIENTE') {
    return true
  }
  return false
}
