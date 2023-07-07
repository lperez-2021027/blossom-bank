import { useState, useEffect } from 'react'
import { AdminNavBar } from './AdminNavBar'
import { obtenerCuentas, crearCuenta, eliminarCuenta, obtenerUsuarios, obtenerTiposCuentas, obtenerCuentasOrdenAsc, obtenerCuentasOrdenDesc } from '../api/apiCuentas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountDown, faSortAmountUp, faTrash } from '@fortawesome/free-solid-svg-icons'

export const CuentaAdminPage = () => {
  const [cuentas, setCuentas] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [idCuenta, setIdCuenta] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [usuarios, setUsuarios] = useState([])
  const [tiposCuentas, setTiposCuentas] = useState([])
  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedTipoCuenta, setSelectedTipoCuenta] = useState('')
  const [saldo, setSaldo] = useState('')
  const [ordenamiento, setOrdenamiento] = useState('desc')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    obtenerCuentas(searchTerm)
      .then((data) => {
        setCuentas(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [searchTerm])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let cuentasData
        if (ordenamiento === 'desc') {
          cuentasData = await obtenerCuentasOrdenDesc()
        } else {
          cuentasData = await obtenerCuentasOrdenAsc()
        }
        setCuentas(cuentasData)

        const usuariosData = await obtenerUsuarios()
        setUsuarios(usuariosData)

        const tiposCuentasData = await obtenerTiposCuentas()
        setTiposCuentas(tiposCuentasData)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    obtenerUsuarios()
      .then((data) => {
        setUsuarios(data)
      })
      .catch((error) => {
        console.error(error)
      })

    obtenerTiposCuentas()
      .then((data) => {
        setTiposCuentas(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const handleToggleAddForm = () => {
    setShowAddForm(!showAddForm)
  }

  const handleBuscarCuenta = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      let response
      if (ordenamiento === 'desc') {
        response = await obtenerCuentasOrdenDesc(searchTerm)
      } else {
        response = await obtenerCuentasOrdenAsc(searchTerm)
      }
      setCuentas(response)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleAgregarCuenta = async (event) => {
    event.preventDefault()
    try {
      const response = await crearCuenta(selectedUserId, saldo, selectedTipoCuenta)
      const newAccount = response
      setCuentas((prevCuentas) => [...prevCuentas, newAccount])
      setSelectedUserId('')
      setSelectedTipoCuenta('')
      setSaldo('')
      setShowAddForm(false)

      obtenerCuentas(searchTerm)
        .then((data) => {
          setCuentas(data)
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const handleEliminarCuenta = async (event) => {
    event.preventDefault()
    try {
      await eliminarCuenta(idCuenta)
      setCuentas(cuentas.filter((cuenta) => cuenta._id !== idCuenta))
      setIdCuenta('')
    } catch (error) {
      console.error(error)
    }
  }

  const getUsuarioNombre = (idUsuario) => {
    const usuario = usuarios.find((usuario) => usuario._id === idUsuario)
    return usuario ? usuario.nombre : ''
  }

  const getTipoCuentaNombre = (idTipoCuenta) => {
    const tipoCuenta = tiposCuentas.find((tipoCuenta) => tipoCuenta._id === idTipoCuenta)
    return tipoCuenta ? tipoCuenta.nombre : ''
  }

  const getCuentaNumero = (cuentaId) => {
    const cuenta = cuentas.find((cuenta) => cuenta._id === cuentaId)
    return cuenta ? cuenta.noCuenta : ''
  }

  return (
    <>
      <AdminNavBar />
      <div className='container mt-4'>
        <div className='row'>
          <div className='col-md-6'>
            <form onSubmit={handleBuscarCuenta} className='mb-3'>
              <div className='input-group'>
                <button className='btn btn-outline-primary' onClick={() => setOrdenamiento(ordenamiento === 'desc' ? 'asc' : 'desc')}>
                  {ordenamiento === 'desc' ? <FontAwesomeIcon icon={faSortAmountDown} /> : <FontAwesomeIcon icon={faSortAmountUp} />}
                </button>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Buscar por No.Cuenta o ID del Usuario'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='btn btn-outline-primary txt-buttons' type='submit' disabled={loading}>
                  Buscar
                </button>
              </div>
            </form>
          </div>
          <div className='col-md-6'>
            <div className='input-group'>
              <button className='btn btn-outline-success txt-buttons mb-2' onClick={handleToggleAddForm}>
                {showAddForm ? 'Cancelar' : 'Agregar'}
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAgregarCuenta} className='mb-3'>
                <div className='input-group'>
                  <select
                    className='form-control'
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    required
                  >
                    <option value=''>Seleccionar usuario</option>
                    {usuarios.map((usuario) => (
                      <option key={usuario._id} value={usuario._id}>
                        {usuario.nombre}
                      </option>
                    ))}
                  </select>
                  <select
                    className='form-control'
                    value={selectedTipoCuenta}
                    onChange={(e) => setSelectedTipoCuenta(e.target.value)}
                    required
                  >
                    <option value=''>Seleccionar tipo de cuenta</option>
                    {tiposCuentas.map((tipoCuenta) => (
                      <option key={tipoCuenta._id} value={tipoCuenta._id}>
                        {tipoCuenta.nombre}
                      </option>
                    ))}
                  </select>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Saldo'
                    value={saldo}
                    min='100'
                    onChange={(e) => setSaldo(e.target.value)}
                    required
                  />
                  <button className='btn btn-outline-success txt-buttons' type='submit'>
                    Agregar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className='table-responsive'>
          <table className='table table-striped txt-list'>
            <thead>
              <tr>
                <th>No. Cuenta</th>
                <th>Usuario</th>
                <th>Tipo de Cuenta</th>
                <th>Saldo</th>
                <th>No. Transacciones</th>
              </tr>
            </thead>
            <tbody>
              {cuentas && cuentas.map((cuenta) => (
                <tr key={cuenta._id}>
                  <td>{cuenta.noCuenta}</td>
                  <td>{getUsuarioNombre(cuenta.idUsuario)}</td>
                  <td>{getTipoCuentaNombre(cuenta.idTipoCuenta)}</td>
                  <td>Q. {cuenta.saldo}</td>
                  <td>{cuenta.noTransactions}</td>
                  <td>
                    <button
                      className='btn btn-outline-danger btn-sm txt-buttons'
                      onClick={() => setIdCuenta(cuenta._id)}
                      data-bs-toggle='modal'
                      data-bs-target='#eliminarCuentaModal'
                    >
                      Eliminar
                      <FontAwesomeIcon icon={faTrash} className='px-2' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para eliminar cuenta */}
      <div className='modal fade' id='eliminarCuentaModal' tabIndex='-1' aria-labelledby='eliminarCuentaModalLabel' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title txt-buttons' id='eliminarCuentaModalLabel'>Eliminar Cuenta</h5>
            </div>
            <div className='modal-body'>
              <p>¿Estás seguro de que quieres eliminar la cuenta con el numero de cuenta "{getCuentaNumero(idCuenta)}"?</p>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary txt-buttons' data-bs-dismiss='modal'>Cancelar</button>
              <button type='button' className='btn btn-danger txt-buttons' data-bs-dismiss='modal' onClick={handleEliminarCuenta}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
