import { useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import { getDivisas } from '../global/api/apiDivisas'

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState('')
  const [usdValue, setUsdValue] = useState('')
  const [eurValue, setEurValue] = useState('')
  let roleUser

  const login = (rol = '') => {
    roleUser = rol
    // eslint-disable-next-line no-undef
    localStorage.setItem('rol', rol)
  }

  const userRol = () => {
    // console.log(roleUser)
    // eslint-disable-next-line no-undef
    localStorage.setItem('rol', roleUser)
    return roleUser
  }

  const logout = () => {
    // eslint-disable-next-line no-undef
    localStorage.removeItem('token')
    // eslint-disable-next-line no-undef
    localStorage.removeItem('rol')
  }

  const dataDivisas = async () => {
    // eslint-disable-next-line no-undef
    const existeData = localStorage.getItem('dataDvisas')
    if (!existeData) {
      const a = await getDivisas()
      // eslint-disable-next-line no-undef
      localStorage.setItem('dataApi', JSON.stringify(a))
      setEurValue(a.EUR.value)
      setUsdValue(a.GTQ.value)
    } else {
      const data = JSON.parse(existeData)
      console.log(data.name)
      setEurValue(data.EUR.value)
      setUsdValue(data.GTQ.value)
    }
  }

  useEffect(() => {
    roleUser = userData
    dataDivisas()
  }, [userData])

  return (
    <UserContext.Provider value={{ userData, setUserData, login, logout, userRol, usdValue, eurValue }}>
      {children}
    </UserContext.Provider>
  )
}
