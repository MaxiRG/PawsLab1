import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'

function Busqueda(props) {
  const {isLoggedIn} = props;
  const {isShelter} = props;
  
  return (
    <div>
      <body>
        <Navbar/>

        <Footer/>
      </body>
    </div>

  )

}
export default Busqueda