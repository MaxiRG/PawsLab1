  import React, { useState } from 'react';
  import { useNavigate } from "react-router-dom";
  import Footer from '../components/Footer';
  import Navbar from '../components/Navbar';
  import "../styles/Donacion.css";
  import Button from 'react-bootstrap/Button';
  import { post } from "../utils/http";

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


    const createPost = async (Post, token) => {
      try {
        const response = await post('/createPost', Post, {
          headers: {
            'Authorization': "Bearer " + token
          }
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    };
    
    const handleFormSubmit = (event) => {
      event.preventDefault();
    
      const Post = {
        name: petName,
        age: petAge,
        description: petDescription,
        sex: petSex,
        race: petRace
      };
    
      // Call the createPost function with the post object and the token
      const token = localStorage.getItem('token');
      createPost(Post, token)
        .then(response => {
          console.log(response);
          // Reset the form fields and hide the form
          setPetName('');
          setPetSex('');
          setPetAge('');
          setPetRace('');
          setPetDescription('');
          setIsFormExpanded(false);
        });
    };
     

    return (
      <div className='donacion'>
        <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
        <div className='body'>
        <Button className='button' variant="light" onClick={() => setIsFormExpanded(true)}>Add post</Button>

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
                <input type="text" name="petRace" value={petRace} onChange={(event) => setPetRace(event.target.value)} required />
              </label>
              <label>
                Description <br/>
                <input type='text'  name="petDescription" value={petDescription} onChange={(event) => setPetDescription(event.target.value)} required />
              </label>
              <Button className='submitButton' variant="primary" type="submit" >Submit</Button>
            </form>
          )}
          <Button className='button' variant="light" > My posts </Button> 
        </div>
        <Footer/>
      </div>
    );
  }

  export default Donacion;
