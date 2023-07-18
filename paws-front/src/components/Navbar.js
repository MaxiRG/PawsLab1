import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../images/logo.jpg";

function Navbar(props) {
  const { isLoggedIn } = props;
  const { isShelter } = props;

  const handleClick = () => {
    const navbarLinks = document.getElementsByClassName("navbar-links")[0];
    navbarLinks.classList.toggle("active");
  };

  return (
    <nav className="navbar">
      <div className="brand-logo-container">
        <div className="brand-title">PAWS</div>
        <img className="logo-navbar" src={logo} alt="logo" />
      </div>

      <button href="#" className="toggle-button" onClick={handleClick}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <div className="navbar-links">
        <ul>
          <li>
            <a href="/#quienes-somos">About us</a>
          </li>
          <li>
            <a href="/#adopciones">History</a>
          </li>
          <li>
            {isShelter ? (
              <Link to="/donacion">Donate</Link>
            ) : (
              <Link to="/busqueda">Adopt</Link>
            )}
          </li>
          <li>
            {isLoggedIn ? (
              <Link to="/account">Account</Link>
            ) : (
              <Link to="/login">Sign In</Link>
            )}
          </li>
          
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
