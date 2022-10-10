import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../img/logo.png'
import { AuthContext } from '../context/authContext'

const Navbar = () => {

  const { currentUser, logout } = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to='/?cat=esportivos'>
            <h6>Esportivos</h6>
          </Link>
          <Link className='link' to='/?cat=classicos'>
            <h6>Clássicos</h6>
          </Link>
          <Link className='link' to='/?cat=eletricos'>
            <h6>Elétricos</h6>
          </Link>
          <Link className='link' to='/?cat=hibridos'>
            <h6>Híbridos</h6>
          </Link>
          
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : ( 
            <Link className='link' to="/login">
              Login
            </Link>
          )}
          
          <span className="write">
            <Link className='link' to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar