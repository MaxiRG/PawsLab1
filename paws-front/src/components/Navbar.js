import React from "react";
import "../styles/Navbar-styles.css";
import logo from '../images/logo.jpg'
import { Link } from "react-router-dom"


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
        <div className="brand-title">PAWS</div>
        <img 
        className='logo-navbar'
        src={logo}
        alt='logo'/>

        <button href="#" className="toggle-button" onClick={this.handleClick}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <div className="navbar-links">
          <ul>
            <li>
              <Link to="/#quienes-somos" >Nosotros</Link>
            </li>
            <li>
              <Link to="/#adopciones">Historial</Link>
            </li>
            <li>
              <Link to="/busqueda">Adoptar</Link>
            </li>
            <li>
              <Link to="/#contacto">Contacto</Link>
            </li>
            <li>
            {isLoggedIn ? (
                <Link to="/my-account">My Account</Link>
              ) : (
                <Link to="/login">Sign In</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
