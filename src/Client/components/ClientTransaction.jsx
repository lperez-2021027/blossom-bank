import { useEffect, useState } from 'react'
import { ClientNavBar } from './ClientNavBar'
import { getMisCuentas, getTipoTransfer, realizarTransaction } from '../api/apiTransaction'
import Swal from 'sweetalert2'

export const ClientTransaction = () => {
  const [noCuentaOr, setNoCuentaOr] = useState('')
  const [noCuentaDest, setNoCuentaDest] = useState('')
  const [tipoTransfer, setTipoTransfer] = useState([])
  const [idTipoTransfer, setIdTipoTransfer] = useState('')
  const [misCuentas, setMisCuentas] = useState([])
  const [descripcion, setDescripcion] = useState('')
  const [cantidad, setCantidad] = useState(1)

  const handleTransaction = async (event) => {
    event.preventDefault()
    try {
      const data = await realizarTransaction(
        descripcion,
        cantidad,
        idTipoTransfer,
        noCuentaOr,
        noCuentaDest
      )
      Swal.fire({
        icon: 'success',
        title: 'Transacción realizada correctamente',
        text: data.msg,
        confirmButtonText: 'Ok'
      }).then(
        setNoCuentaDest(''),
        setCantidad(1),
        setDescripcion('')
      )
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al realizar la transacción',
        text: error
      })
    }
  }

  const fetchData = async () => {
    try {
      const tiposTransfer = await getTipoTransfer()
      setTipoTransfer(tiposTransfer)

      const misCuentas = await getMisCuentas()
      setMisCuentas(misCuentas)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <ClientNavBar />
      <div className='container mt-4 txt-list fs-2'>
        <div className='row'>
          <div className='col'>
            <form onSubmit={handleTransaction}>

              <div className='mb-3'>
                <label className='form-label fs-5'>No. de cuenta</label>
                <select
                  className='form-control'
                  value={noCuentaOr}
                  onChange={(e) => setNoCuentaOr(e.target.value)}
                  required
                >
                  <option value=''>Selecciona tu No. de cuenta</option>
                  {misCuentas.map((misCuentas) => (
                    <option key={misCuentas._id} value={misCuentas.noCuenta}>
                      {misCuentas.noCuenta}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mb-3'>
                <label className='form-label fs-5'>Tipo de transacción</label>
                <select
                  className='form-control'
                  value={idTipoTransfer}
                  onChange={(e) => setIdTipoTransfer(e.target.value)}
                  required
                >
                  <option value=''>Selecciona el tipo de transacción</option>
                  {tipoTransfer.map((tipoTransfer) => (
                    <option key={tipoTransfer._id} value={tipoTransfer._id}>
                      {tipoTransfer.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mb-3'>
                <label className='form-label fs-5'>No. de cuenta a transferir</label>
                <input
                  type='text'
                  className='form-control'
                  required
                  value={noCuentaDest}
                  onChange={(e) => setNoCuentaDest(e.target.value)}
                />
              </div>

              <div className='mb-3'>
                <label className='form-label fs-5'>Monto a transferir</label>
                <input
                  type='number'
                  className='form-control'
                  min='1'
                  max='10000'
                  required
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </div>

              <div className='mb-4'>
                <label className='form-label fs-5'>Descripción de la transacción</label>
                <input
                  type='text'
                  className='form-control'
                  required
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>

              <button className='btn btn-outline-dark txt-buttons' type='submit'>
                Realizar transacción
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}
