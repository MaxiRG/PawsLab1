  import React, { useState } from 'react';
  import { useNavigate } from "react-router-dom";
  import Footer from '../components/Footer';
  import Navbar from '../components/Navbar';
  import "../styles/Donacion.css";
  import Button from 'react-bootstrap/Button';
  import { post, get} from "../utils/http";

  function Donacion(props) {
    const { isLoggedIn } = props;
    const { isShelter } = props;
    const navigate = useNavigate();
    const [isFormExpanded, setIsFormExpanded] = useState(false);
    const [petName, setPetName] = useState('');
    const [petSex, setPetSex] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petRace, setPetRace] = useState('');
    const [petDescription, setPetDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState("");



    const handleMyPosts = (e) => {
      e.preventDefault();

      const token = localStorage.getItem('token');

      const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Set your authorization header here
        }
      }

      get('/getMyPosts', config)
        .then(response => {
          console.log(response)
          console.log("success")

        })
        .catch(error => {
          console.error(error)
          setErrorMessage('Post creation failed. Please try again later.');
        });
      }


    
    const handleFormSubmit = (e) => {
      e.preventDefault();
      
      const body = {
        petName: petName,
        age: petAge,
        sex: true,
        race: petRace,
        description: petDescription
      };
    
      const token = localStorage.getItem('token');
      console.log(token)

      const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Set your authorization header here
        }
      }
      console.log(config)
      console.log(body)
      
      post('/createPost', body, config)
        .then(response => {
          console.log(response)
          console.log("success")
          setPetName('');
          setPetSex('');
          setPetAge('');
          setPetRace('');
          setPetDescription('');
          setIsFormExpanded(false);
        })
        .catch(error => {
          console.error(error)
          setErrorMessage('Post creation failed. Please try again later.');
        });
      }
    

    return (
      <div className='donacion'>
        <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
        <div className='body'>
        <Button className='button' variant="light" onClick={() => setIsFormExpanded(true)}>Add post</Button>
        {errorMessage && <div id="error-message">{errorMessage}</div>}

          {isFormExpanded && (
            <form className='form' onSubmit={handleFormSubmit}>
              <label>
                Pet name<br/>
                <input type="text" name="petName" value={petName} onChange={(event) => setPetName(event.target.value)} required/>
              </label>
              <label>
                Sex<br/>
                <select name="petSex" value={petSex} onChange={(event) => setPetSex(event.target.value)} required>
                  <option value="">Select sex</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
              <label>
                Age<br/>
                <input type="number" name="petAge" value={petAge} onChange={(event) => setPetAge(event.target.value)} required/>
              </label>
              <label>
                Race<br/>
                <input type="text" name="petRace" value={petRace} onChange={(event) => setPetRace(event.target.value)}  required/>
              </label>
              <label>
                Description <br/>
                <input type='text'  name="petDescription" value={petDescription} onChange={(event) => setPetDescription(event.target.value)}  required/>
              </label>
              <Button className='submitButton' variant="primary" type="submit" >Submit</Button>
            </form>
          )}
          <Button className='button' variant="light" onClick={handleMyPosts}> My posts </Button> 
        </div>
        <Footer/>
      </div>
    );
  }

  export default Donacion;
