import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import SelectedPost from '../components/SelectedPost';
import { get , post} from "../utils/http";
import '../styles/Busqueda.css'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import { FaEye } from 'react-icons/fa';


function Busqueda(props) {
  const { isLoggedIn, isShelter } = props;
  const [posts, setPosts] = useState([]);
  const [favPosts, setFavPosts] = useState([]);
  const [shelters, setShelters] = useState([])
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [cardShelter, setCardShelter] = useState(null);
  const [cardPicture, setCardPicture] = useState([]);
  const [pictures, setPictures] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);
  const navigate = useNavigate()
  const [searchFilters, setSearchFilters] = useState({
    age: '',
    sex: '',
    race: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', 
  }}
    if (token && !selectedPost) {
      get(`/getUserFavourites`, config)
        .then((data) => {
          console.log(data);
          setFavPosts(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedPost, showFavorites]);
  
  useEffect(() => {
    get('/api/getShelters')
    .then((response) => {
      console.log(response)
      setShelters(response)
    })
    .catch((e)=> {
      console.error(e)
    })
  }
  ,[])

  const handleSearch = (event) => {
    event.preventDefault();
    
    let ageType = "UNDEFINED";
    

    if (searchFilters.age === "puppy") {
      ageType = "PUPPY";
    } else if (searchFilters.age === "adult") {
      ageType = "ADULT";
    }

    const race = searchFilters.race || "UNDEFINED";
    const sex = searchFilters.sex || "UNDEFINED";

  
    const body = {
      race: race,
      sex: sex,
      ageType: ageType
    };

    post('/getFilteredList', body)
      .then(response => {
        console.log(response);
        console.log("posts retrieved");
        setPosts(response);
        setErrorMessage('')
    
        response.forEach(post => {
          const postId = post.id;
          handleGetProfilePictures(postId);
          });
      })
      .catch(error => {
        console.error(error);
        setErrorMessage('Post retrieval failed. Please try again later.');
      });
  };
  
  const handleGetProfilePictures = (id) => {
    get(`/getProfilePicture/${id}`, { responseType: 'arraybuffer' })
      .then(response => {
        console.log('images retrieved')
        const blob = new Blob([response], { type: 'image/jpeg' }); // Adjust the 'type' accordingly
        const blobUrl = URL.createObjectURL(blob);
        setPictures((prevState) => ({
        ...prevState,
        [id]: blobUrl,
     }));
        
      })
      .catch(error => {
        console.error(error);
        setErrorMessage('Failed to retrieve images');
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
    get("/getProfilePicture/" + post.id)
        .then((picture) => {
          console.log("image retrieved")
          const blob = new Blob([picture], { type: 'image/jpeg' }); 
          const blobUrl = URL.createObjectURL(blob);
          setCardPicture(blobUrl)
        })
        .catch((error) => {
          console.log(error);
        });
  }

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  

  return (
    <div className=''>
      <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <div className='body'>

          {!selectedPost && (
            <form className="search-form"onSubmit={handleSearch}>
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
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            <label htmlFor="race-filter"> Race: </label>
            <select
            id="race-filter"
            name="race"
            value={searchFilters.race}
            onChange={handleFilterChange}
            >
              <option value="">Any race</option>
              <option value="LabradorRetriever">Labrador Retriever</option>
              <option value="GermanShepherd">German Shepherd</option>
              <option value="GoldenRetriever">Golden Retriever</option>
              <option value="FrenchBulldog">French Bulldog</option>
              <option value="EnglishBulldog">English Bulldog</option>
              <option value="Poodle">Poodle</option>
              <option value="Beagle">Beagle</option>
              <option value="Boxer">Boxer</option>
              <option value="Chihuahua">Chihuahua</option>
              <option value="Rottweiler">Rottweiler</option>
              <option value="YorkshireTerrier">Yorkshire Terrier</option>
              <option value="Dachshund">Dachshund</option>
              <option value="SiberianHusky">Siberian Husky</option>
              <option value="CockerSpaniel">Cocker Spaniel</option>
              <option value="Pomeranian">Pomeranian</option>
              <option value="ShihTzu">Shih Tzu</option>
              <option value="BichonFrise">Bichon Frise</option>
              <option value="BorderCollie">Border Collie</option>
              <option value="Doberman">Doberman</option>
              <option value="Schnauzer">Schnauzer</option>

            </select>
            <button className='submit' type="submit">Search</button>
            <Button className="fav-button btn btn-light" onClick={() => setShowFavorites(!showFavorites)}>
              <FaEye className='eye-icon' />
              {showFavorites ? "Show All" : "Show Favorites"}
            </Button>
            </form>   
          )}

        {errorMessage && <div id="error-message">{errorMessage}</div>}

        {selectedPost ? (
          <div>
            <SelectedPost selectedPost={selectedPost} cardShelter={cardShelter} cardPicture={cardPicture} isShelter={isShelter}/>
            <div className='expanded-buttons'>
             <Button className='expanded-button' id='expanded-button' variant="outline-danger" onClick={() => setSelectedPost(null)}> 
               <FontAwesomeIcon icon={faTimes} className="button-icon" />Close
             </Button>
            </div>   
        </div> 
        ):(
          <div className='card-container'>
             {showFavorites
              ? favPosts.length > 0 &&
              posts
              .filter(post => favPosts.some(favPost => favPost.post.id === post.id))
              .map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  picture={pictures[post.id]}
                  handleSelectedPost={handleSelectedPost}
                  clickable={true}
                  handleFavourite={true}
                  favPosts={favPosts}
                />
              ))
              : posts.length > 0 &&
                posts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    picture={pictures[post.id]}
                    handleSelectedPost={handleSelectedPost}
                    clickable={true}
                    handleFavourite={true}
                    favPosts={favPosts}
                  />
                ))
            }




          </div>
        )}

          <div className='shelter-list'>
            {shelters.length > 0 &&
              shelters.map((shelter) => (
                <div
                  className='shelter-link' 
                  key={shelter.id} 
                  onClick={() => navigate(`/shelter/${shelter.id}`)}>

                  {shelter.name}

                </div>
              ))}
          </div>
        </div>

       

      <Footer />
    </div>
  );
}

export default Busqueda;
