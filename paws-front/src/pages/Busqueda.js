import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SelectedPost from '../components/SelectedPost';
import { get } from "../utils/http";
import '../styles/Busqueda.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Busqueda(props) {
  const { isLoggedIn, isShelter } = props;
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [cardShelter, setCardShelter] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    age: '',
    sex: '',
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

  const handleSelectedPost = (post) => {
    console.log(post.user.id)
    get("/api/getInfo/" + post.user.email)
    .then((data) => {
      console.log(data);
      setCardShelter(data)
      setSelectedPost(post);
    })
    .catch((error) => {
      console.log(error);
    });
  }


  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  return (
    <div className='all'>
      <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <div className='body'>
      {!selectedPost && (
          <form onSubmit={handleSearch}>
          <label htmlFor="age-filter">Age: </label>
          <select
            id="age-filter"
            name="age"
            value={searchFilters.age}
            onChange={handleFilterChange}
          >
            <option value="">Any age</option>
            <option value="puppy">Puppy</option>
            <option value="adult">Adult</option>
            
          </select>
          <label htmlFor="sex-filter"> Sex: </label>
          <select
            id="sex-filter"
            name="sex"
            value={searchFilters.sex}
            onChange={handleFilterChange}
          >
            <option value="">Any sex</option>
            <option value="macho">Male</option>
            <option value="hembra">Female</option>
          </select>
          <button className='submit' type="submit">Buscar</button>
        </form>     
        )}
        {errorMessage && <div id="error-message">{errorMessage}</div>}

        {selectedPost ? (
          <div>
            <SelectedPost selectedPost={selectedPost} cardShelter={cardShelter}/>
            <div className='expanded-buttons'>
                <Button className='expanded-button' variant="outline-danger" onClick={() => setSelectedPost(null)}>Close</Button>
            </div>   
        </div> 
        ):(
          <div className='card-container'>
              {posts.length > 0 &&
              posts.map(post => (
                <Card key={post.id} className="custom-card" onClick={() => handleSelectedPost(post)} >
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
        )}
        </div>
      <Footer />
    </div>
  );
}

export default Busqueda;
