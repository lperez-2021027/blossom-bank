import { Link } from 'react-router-dom'

export const Card = (props) => {
  const imgStyle = {
    width: '400px',
    height: 'auto',
    maxWidth: '100%'
  }

  const divContStyle = {
    boxShadow: '11px 14px 25px 1px #9c549c'
  }

  return (

    <>
      <div className='item mb-5 container text-center' style={divContStyle}>
        <div className='row g-3 g-xl-0'>

          <div className='col-sm-12 col-xl-3'>
            <Link to={props.URL}>
              <img
                className='img-fluid post-thumb px-4 py-1' src={props.img}
                alt={props.title} style={imgStyle}
              />
            </Link>
          </div>

          <div className='col '>
            <h3 className='title mt-3 fs-3'>
              <Link to={props.URL} className='no-text-decoration nav-link txt-secondary fs-2'>
                {props.title}
              </Link>
            </h3>
            <Link to={props.URL} className='no-text-decoration nav-link'>
              <button className='btn btn-dark p-3 my-5 txt-secondary fs-5' type='submit'>{props.destiny}</button>
            </Link>
          </div>

        </div>

      </div>
    </>

  )
}
