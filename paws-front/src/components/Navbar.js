import React from "react";
import "../styles/Navbar-styles.css";
import logo from '../images/logo.jpg'
import { Link } from "react-router-dom"


class Navbar extends React.Component {

  state = {
    isLoggedIn: false
  };

  role = {
    isShelter: false
  }
  

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
  
  handleShelter = () => {
    this.setState({isShelter: true})
  }

  handleAdoptant = () => {
    this.setState({isShelter: false})
  }

  render() {

    const { isLoggedIn } = this.state;
    const { isShelter } = this.role;

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
              <a href="/#quienes-somos" >Nosotros</a>
            </li>
            <li>
              <a href="/#adopciones">Historial</a>
            </li>
            <li>
              {isShelter ? 
              (<Link to="/donacion">Donar</Link>)
              : 
              (<Link to="/busqueda">Adoptar</Link>)
              }
            </li>
            <li>
              <a href="/#contacto">Contacto</a>
            </li>
            <li>
            {isLoggedIn ? 
              (<Link to="/my-account">Account</Link>)
              :
              (<Link to="/login">Sign In</Link>)
              }
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
