import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import Perro from '../images/perro1.jpg'
import '../styles/Home.css'
function App() {
  return (
    <div>
      <body>
        <Navbar/>
          <div className='content'>
            <div className='linea' id='quienes-somos'>
              <h2 className="pelota">¿Quienes somos?</h2> 
              <div className='parrafo'>
                <div className="logo-div">
                  <img className='foto-perro' src={Perro} alt='perro'/>
                </div>
                              Paws se formo con el fin de encontrar un hogar para todos los perros y gatos que lo necesiten.
                              Intentamos faciltar la busqueda de su fututa mascota a los adoptantes ya que cualquier refugio o persona
                              es bienvenida a publicar los animales a traves de nuestra pagina.
                              Mediante nosotros, cualquier persona puede contactar al refugio o dador correspondiente para
                              cualquier consulta o duda acerca de la adopcion de las mascotas.
                              Adoptando estás salvando la vida de un animal rescatado. Cada perro adoptado deja su lugar 
                              para que ingrese otro y pueda ser recuperado en el refugio. 
                              Adoptar es un acto de amor y de responsabilidad, por eso es necesario estar completamente seguros de que
                              estamos capacitados y listos para tener un perro. Un animal de compañía dependerá toda su vida de nosotros.
                              Recordá que un perro puede vivir entre 15 y 20 años y estás asumiendo un compromiso serio por todo ese tiempo.
              </div>
            </div>
          </div>
                
                  
        <Footer/>
      </body>
    </div>
  );
}

export default App;
