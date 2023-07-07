export const NotFound = () => {
  const fontSize = {
    fontSize: '111px'
  }
  return (
    <div className='container'>
      <div className='row'>
        <br />
      </div>
      <div className='row'>
        <div className='col' />
        <div className='col'>
          <h1 style={fontSize}>404</h1>
          <p className='fs-1 txt-secondary'>Página no encontrada :c</p>
        </div>
        <div className='col' />
      </div>
    </div>
  )
}
