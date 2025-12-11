import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.png';

export default function Navbar(props) {
  let history = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    history('/auth');
    props.showAlert('Logout Successfully', 'success');
  };
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-dark header-fixed">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              src={logo}
              style={{ width: '70px' }}
              className="nav-logo img-fluid"
              alt="Logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link active`} to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link`} to="/about">
                  About
                </Link>
              </li>
            </ul>

            {!localStorage.getItem('token') ? (
              <div>
                <Link className="btn btn-primary mx-3" to="/login">
                  Login
                </Link>
                <Link className="btn btn-success" to="/signup">
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/user">
                  <i
                    className="fa-solid fa-user mx-4"
                    style={{ color: 'white' }}
                  ></i>
                </Link>
                <button className="btn btn-primary" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
