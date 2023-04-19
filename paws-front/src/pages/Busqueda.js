import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { get } from "../utils/http";
import '../styles/Busqueda.css'
import Card from 'react-bootstrap/Card';

function Busqueda(props) {
  const { isLoggedIn, isShelter } = props;
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchFilters, setSearchFilters] = useState({
    animal: '',
    age: '',
    sex: '',
    race: ''
  });

  const handleSearch = (event) => {
    event.preventDefault();
    
    get('/getAll')
        .then(response => {
          console.log(response)
          console.log("success")
          setPosts(response);
      
        })
        .catch(error => {
          console.error(error)
          setErrorMessage('Post retrieval failed. Please try again later.');
        });
  

  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  return (
    <div className='all'>
      <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <div className='body'>
        <form onSubmit={handleSearch}>
          <label htmlFor="animal-filter"> Animal: </label>
          <select
            id="animal-filter"
            name="animal"
            value={searchFilters.animal}
            onChange={handleFilterChange}
          >
            <option value="">Cualquier animal</option>
            <option value="gato">Gato</option>
            <option value="perro">Perro</option>
          </select>
          <label htmlFor="age-filter">Edad: </label>
          <select
            id="age-filter"
            name="age"
            value={searchFilters.age}
            onChange={handleFilterChange}
          >
            <option value="">Cualquier edad</option>
            <option value="joven">Joven</option>
            <option value="adulto">Adulto</option>
            <option value="senior">Senior</option>
          </select>
          <label htmlFor="sex-filter"> Sexo: </label>
          <select
            id="sex-filter"
            name="sex"
            value={searchFilters.sex}
            onChange={handleFilterChange}
          >
            <option value="">Cualquier sexo</option>
            <option value="macho">Macho</option>
            <option value="hembra">Hembra</option>
          </select>
          <label htmlFor="race-filter"> Raza:</label>
          <select
            id="race-filter"
            name="race"
            value={searchFilters.race}
            onChange={handleFilterChange}
          >
            <option value="">Cualquier raza</option>
            <option value="labrador">Labrador</option>
            <option value="pastor_aleman">Pastor alemán</option>
            <option value="bulldog_frances">Bulldog francés</option>
          </select>
          <button className='submit' type="submit">Buscar</button>
        </form>
        {errorMessage && <div id="error-message">{errorMessage}</div>}
        <div className='card-container'>
              {posts.length > 0 &&
              posts.map(post => (
                <Card key={post.id} className="custom-card" >
                  <Card.Body>
                    <Card.Title className='card-title'>{post.petName}</Card.Title>
                    <Card.Text>
                      Sex: {post.sex ? 'Male' : 'Female'}<br />
                      Age: {post.age}<br />
                      Race: {post.race}<br />
                      Description: {post.description}<br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
            }
          </div>
        </div>
        

        
      <Footer />
    </div>
  );
}

export default Busqueda;
