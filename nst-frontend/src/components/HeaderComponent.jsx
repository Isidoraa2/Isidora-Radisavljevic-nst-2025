import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

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

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <a className="navbar-brand" href="/">Aplikacija</a>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="navbar-nav ms-auto">
                <Link className="btn btn-outline-light me-1" to="/dobavljaci">Prikazi dobavljače</Link>
                <Link className="btn btn-outline-light me-1" to="/dodaj-dobavljaca">Dodaj dobavljaca</Link>
                <Link className="btn btn-outline-light me-1" to="/prikazi-narudzbenicu">Nađi narudžbenicu</Link>
                <Link className="btn btn-outline-light me-1" to="/dodaj-narudzbenicu">Dodaj narudžbenicu</Link>
                <Link className="btn btn-outline-light me-1" to="/dodaj-proizvod">Dodaj proizvod</Link>
                <Link className="btn btn-outline-light me-1" to="/proizvodi">Prikaži proizvode</Link>
              </div>
            </div>
            <div>
             <FaUserCircle
              className="cursor-pointer text-white"
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