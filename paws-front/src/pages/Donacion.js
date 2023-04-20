  import React, { useState } from 'react';
  import { useNavigate } from "react-router-dom";
  import Footer from '../components/Footer';
  import Navbar from '../components/Navbar';
  import "../styles/Donacion.css";
  import Button from 'react-bootstrap/Button';
  import Card from 'react-bootstrap/Card';
  import { Form } from 'react-bootstrap';
  import { post, get, del } from "../utils/http";




  function Donacion(props) {
    const { isLoggedIn } = props;
    const { isShelter } = props;
    const [petName, setPetName] = useState('');
    const [petSex, setPetSex] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petRace, setPetRace] = useState('');
    const [petDescription, setPetDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [myPosts, setMyPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const navigate = useNavigate();
   

  
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
          setMyPosts(response);
      
        })
        .catch(error => {
          console.error(error)
          setErrorMessage('Post retrieval failed. Please try again later.');
        });
      }

    const handleFormSubmit = (e) => {
      e.preventDefault();
      
      const body = {
        petName: petName,
        age: petAge,
        sex: petSex === 'Male',
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
          setErrorMessage('')
        })
        .catch(error => {
          console.error(error)
          setErrorMessage('Post creation failed. Please try again later.');
        });
      }

      const handleDeletePost = (postId) => {
        console.log(postId)
        
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
          const token = localStorage.getItem('token');
          const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', 
            }
          }
          del("/deletePost/" + postId  , config)
            .then((data) => {
            console.log(data)
            console.log("success")
            setErrorMessage('')
            navigate('/')
            
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage("Failed to delete Post")
            // handle error
          });
          }
        }

      const handleFormCancel = () => {
        setPetName('');
        setPetSex('');
        setPetAge('');
        setPetRace('');
        setPetDescription('');
        setIsFormExpanded(false);
        setErrorMessage('')
      }

    

    return (
      <div className='donacion'>
        <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
        {errorMessage && <div id="error-message">{errorMessage}</div>}
        <div className='body'>
        {!selectedPost && (
          <>
            <Button className='button' variant="light" onClick={() => setIsFormExpanded(true)}>Add post</Button>
          </>
        )}

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
              <Button className='cancelButton' variant="outline-danger"  onClick={handleFormCancel}>Cancel</Button>
            </form>
          )}
          {!selectedPost && (
          <>
            <Button className='button' variant="light" onClick={handleMyPosts}> My posts </Button>
          </>
        )}
           {selectedPost ? (
            <div>
              <div className="post-expanded">
                <div className='post-info'>
                {/* Contenido ampliado del post */}
                  <h1 className='post-title'>{selectedPost.petName}</h1>
                  <p className='info'>Sex: {selectedPost.sex ? 'Male' : 'Female'}</p>
                  <p className='info'>Age: {selectedPost.age}</p>
                  <p className='info'>Race: {selectedPost.race}</p>
                  <p className='description'>Description: {selectedPost.description}</p>
                </div>  
                <div className='shelter-info'>
                  <h1 className='shelter-title'>SHELTER</h1>
                  <p className='description'>Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  <p className='info'>Number: 5555-5555</p>
                </div>
              </div>  
                <div className='expanded-buttons'>
                    <Button className='expanded-button' variant="outline-primary" onClick={() => setSelectedPost(null)}>Edit</Button>
                    <Button className='expanded-button' variant="outline-danger" onClick={() => setSelectedPost(null)}>Close</Button>
                    <Button variant="outline-danger" className="deleteButton" onClick={() => handleDeletePost(selectedPost.id)}>Delete</Button> {}

                </div>
              
            </div>  
            ):(
              <div className='card-container'>
              {myPosts.length > 0 &&
              myPosts.map(post => (
                <Card key={post.id} className="custom-card" onClick={() => setSelectedPost(post)} >
                  <Card.Body>
                    <Card.Title className='card-title'>{post.petName}</Card.Title>
                    <Card.Text>
                      Sex: {post.sex ? 'Male' : 'Female'}<br />
                      Age: {post.age}<br />
                      Race: {post.race}<br />
                      Description: {post.description}<br />
                    </Card.Text>
                    <Form.Check
                      type="checkbox"
                      label="Adopted"
                      className="check"
                      //checked={post.adopted} 
                      //onChange={(e) => handleMarkAsAdopted(post._id, e.target.checked)} 
                    />
                  </Card.Body>
                </Card>
              ))
            }
          </div>
            )}             
        </div>

        <Footer/>
      </div>
    );
  }

  export default Donacion;
