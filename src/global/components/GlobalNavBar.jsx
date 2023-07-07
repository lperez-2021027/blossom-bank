import { Link } from 'react-router-dom'

export const GlobalNavBar = () => {
  const navPurple = {
    backgroundColor: '#4f2361'
  }

  return (
    <>

      <nav className='navbar p-0' data-bs-theme='dark'>

        <div className='container-fluid p-4' style={navPurple}>
          <Link className='navbar-brand fs-2 mx-5' to='/'>Blossom bank</Link>
        </div>

      </nav>

    </>
  )
}
