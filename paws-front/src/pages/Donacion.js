import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'

function Donacion(props) {
  const {isLoggedIn} = props;
  const {isShelter} = props;
  
  return (
    <div>
      <div className="body">
        <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
        publicar mascota
        <Footer/>
      </div>
    </div>

  )

}
export default Donacion