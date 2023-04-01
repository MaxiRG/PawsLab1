import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'

function Donacion(props) {
  const {isLoggedIn} = props;
  const {isShelter} = props;
  
  return (
    <div>
      <body>
        <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
        publicar mascota
        <Footer/>
      </body>
    </div>

  )

}
export default Donacion