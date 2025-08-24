import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'

const HeaderComponent = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user"); // briše ulogovanog korisnika
    setIsLoggedIn(false);
    navigate("/"); // vraća na login
  };
  return (
    <div>
      <header>

      <nav className="navbar navbar-dark custom-navbar">
      <div className="container d-flex justify-content-between align-items-center">
            <div>
             <FaUserCircle
              className="logout-icon"
              size={28}
              onClick={handleLogout}
              title="Odjavi se"
            />
          </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent