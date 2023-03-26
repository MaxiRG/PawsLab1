import React from "react";
import "../styles/Navbar-styles.css";
import { Link } from "react-router-dom";
import logo from '../images/logo.jpg'

class Navbar extends React.Component {
  handleClick = () => {
    const navbarLinks = document.getElementsByClassName("navbar-links")[0];
    navbarLinks.classList.toggle("active");
  };

  render() {
    return (
      <nav className="navbar">
        <div className="brand-title">PAWS </div>
        <div className="logo-div">
            <img 
        className='logo-navbar'
        src={logo}
        alt='logo'/></div>

        <a href="#" className="toggle-button" onClick={this.handleClick}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>

        <div className="navbar-links">
          <ul>
            <li>
              <a href="#quienes-somos">Nosotros</a>
            </li>
            <li>
              <a href="#adopciones">Historial</a>
            </li>
            <li>
              <a href="#">Perros</a>
            </li>
            <li>
              <a href="#">Gatos</a>
            </li>
            <li>
              <a href="#contacto">Contacto</a>
            </li>
            <li>
              <a href="#"></a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
