import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import "../styles/Donacion.css"



function Donacion(props) {
  const {isLoggedIn} = props;
  const {isShelter} = props;
  
  return (
    <div className='busqueda'>
      <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <div className='body'>
       
      </div>
      <Footer/>
    </div>

  )

}
export default Donacion