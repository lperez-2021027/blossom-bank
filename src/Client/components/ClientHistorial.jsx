import { useEffect, useState } from 'react'
import { ClientNavBar } from './ClientNavBar'
import { getMiHistorial } from '../api/apiHistorial'

export const ClientHistorial = () => {
  const [miHistorial, setMiHistorial] = useState([])
  const [histNumber, setHistNumber] = useState(0)

  const listarData = async () => {
    const { listHist, totalHist } = await getMiHistorial()
    setHistNumber(totalHist)
    setMiHistorial(listHist)
  }
  useEffect(() => {
    listarData()
  }, [])

  return (
    <>
      <ClientNavBar />
      <div className='container'>
        <div className='row pt-4'>
          <div className='col'>
            <div className='table-responsive'>
              <p className='txt-secondary fs-4'>
                Total de historiales: {histNumber}
              </p>
              <table className='table table-striped txt-list'>
                <thead>
                  <tr>
                    <th>Fecha y hora</th>
                    <th>No. de Cuenta</th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {miHistorial?.map((historial) => (
                    <tr key={historial._id}>
                      <td>
                        {/* {historial.fecha} */}
                        {new Date(historial.fecha)
                          .toLocaleString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                      </td>
                      <td>{historial.idNoCuenta.noCuenta}</td>
                      <td>{historial.descripcion}</td>
                      <td>{historial.cantidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
