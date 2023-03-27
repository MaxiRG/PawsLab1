import React from "react";
import "../styles/Navbar-styles.css";
import { Link } from "react-router-dom";
import logo from '../images/logo.jpg'

class Navbar extends React.Component {

  state = {
    isLoggedIn: false
  };

  handleClick = () => {
    const navbarLinks = document.getElementsByClassName("navbar-links")[0];
    navbarLinks.classList.toggle("active");
  };

  handleLogin = () => {
    // Set the isLoggedIn state to true
    this.setState({ isLoggedIn: true });
  };

  handleLogout = () => {
    // Set the isLoggedIn state to false
    this.setState({ isLoggedIn: false });
  };


  render() {

    const { isLoggedIn } = this.state;

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
              <a href="#">Adoptar</a>
            </li>
            <li>
              <a href="#contacto">Contacto</a>
            </li>
            <li>
            {isLoggedIn ? (
                <Link to="/my-account">My Account</Link>
              ) : (
                <Link to="/sign-in">Sign In</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
