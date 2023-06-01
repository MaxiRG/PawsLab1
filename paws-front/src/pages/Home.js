import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import Perro from '../images/perro1.jpg'
import Perro2 from '../images/perro2.jpg'
import Perro3 from '../images/perro3.jpg'
import Perro4 from '../images/perro4.jpg'

import '../styles/Home.css'

function Home(props) {
  const {isLoggedIn} = props;
  const {isShelter} = props
  
  return (
    <div>
      <div className='body'>
        <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
          <div className='content'>
            <div className='linea' id='quienes-somos'>
              <h2 className="pelota">¿Quienes somos?</h2> 
              <div className='parrafo'>
                <div className="logo-div">
                  <img className='foto-perro' src={Perro} alt='perro'/>
                  
                </div>
                              Paws se formó con el fin de encontrar un hogar para todos los perros y gatos que lo necesiten.
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
            <div className="linea" id="adopciones">
                        <div class="parrafo">
                            <div className="adoption-boxes">
                                A lo largo de los 2 años trabajando junto
                                 con ustedes pudimos encontrar un hogar para 170 perros <br/>
                                
                            </div>
                            <div className='adoption-images'>
                              <img className='foto-history' src={Perro2} alt='perro'/>
                              <img className='foto-history' src={Perro3} alt='perro'/>
                              <img className='foto-history' src={Perro4} alt='perro'/>
                            </div>
                        </div>      
                        <h2 className="pelota">Adopciones</h2>
                </div>
          </div>
          <div className='linea' id='contacto'>
            <h2 class="pelota">Contactanos</h2>
            <div className='parrafo'>
              <div className='contact-form'>
                <span class="heading">Contact Us</span>
                <form>
                  <label htmlFor='name'>Name: </label>
                  <input type="text" required=""/>
                  <label htmlFor='email'>Email: </label>
                  <input type="email" id="email" name="email" required=""/>
                  <label htmlFor="message">Message:</label>
                  <textarea id="message" name="message" required=""/>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
          <div class="social-media">
              <ul>
               <li class="tiktok">
                <a href="https://www.tiktok.com">
                 <i class="fa-brands  fa-tiktok"></i>
                </a>
              </li>          
              <li class="instagram">
               <a href="https://www.instagram.com">
                 <i class="fa fa-instagram"></i>
              </a>
              </li>                
              <li class="twitter">
               <a href="https://www.twitter.com">
                <i class="fa fa-twitter"></i>
               </a>
                </li>
              </ul>
            </div>                
        <Footer/>
      </div>
    </div>
  );
}

export default Home;
