import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Nav() {
    const navigate = useNavigate()
    const handleLogout = () => {
        window.localStorage.clear()
        axios.get('http://localhost:3001/auth/logout')
        .then(result => navigate('/'))
        .catch(err => console.log(err))
    }
  return (
    <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container'>
                <div className='collapse navbar-collapse' id='navbarTogglerDemo1'>
                    <Link className='navbar-brand' to="/">
                        Book Collection
                    </Link>
                    <ul className='navbar-nav ms-2 me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <Link className='nav-link text-white' to="/book/create-book" aria-current='page'>
                                Create
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link text-white' to="/book/saved-book">
                                Favourites
                            </Link>
                        </li>
                    </ul>

                    {
                        window.localStorage.length ? 
                        <button className='btn btn-outline-light' onClick={handleLogout} >
                            Logout
                        </button>
                        :
                        <button className='btn btn-outline-light' >
                            <Link to='/auth/register' className='text-decoration-none'>
                                Login/Register
                            </Link>
                        </button>
                    }
                    
                </div>
            </div>

        </nav>
    </div>
  )
}

export default Nav