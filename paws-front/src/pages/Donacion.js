  import React, { useState } from 'react';
  import { useNavigate } from "react-router-dom";
  import Footer from '../components/Footer';
  import Navbar from '../components/Navbar';
  import SelectedPost from '../components/SelectedPost';
  import "../styles/Donacion.css";
  import Button from 'react-bootstrap/Button';
  import Card from 'react-bootstrap/Card';
  import { Form } from 'react-bootstrap';
  import { post, get, del, put } from "../utils/http";

  function Donacion(props) {
    const { isLoggedIn } = props;
    const { isShelter } = props;
    const [isFormExpanded, setIsFormExpanded] = useState(false);
    const [petName, setPetName] = useState('');
    const [petSex, setPetSex] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petRace, setPetRace] = useState('');
    const [petDescription, setPetDescription] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [myPosts, setMyPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [cardShelter, setCardShelter] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
          const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', 
            }
          }
   
    const handleMyPosts = (e) => {
      e.preventDefault();
      

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

      if (petAge < 0) {
        setErrorMessage("Age cannot be negative.");
        return;
      }
      
      
      
      const body = {
        petName: petName,
        age: petAge,
        sex: petSex === 'male',
        race: petRace,
        description: petDescription
      };
    
      
      post('/createPost', body, config)
        .then(response => {
          console.log(response)
          console.log(petSex)
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

      const handleMarkAsAdopted = (postId, checked) => {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          }
        }
        const body = {
          postID: postId,
          newStatus: checked,
        }; 
        put("/modifyAdoptedStatus", body, config)
          .then((data) => {
            console.log(data);
            // update the state of the post with the new adopted status
            const updatedPosts = myPosts.map(post => {
              if (post.id === postId) {
                return {
                  ...post,
                  adopted: checked
                }
              } else {
                return post
              }
            })
            setMyPosts(updatedPosts);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      
    return (
      <div className='donacion'>
        <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
        <div className='body'>
        {!selectedPost && (
          <>
            <Button className='button' variant="light" onClick={() => setIsFormExpanded(true)}>Add post</Button>
          
            {errorMessage && <div id="error-message">{errorMessage}</div>}
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
              <label>
                Image<br/>
                <input type="file" accept="image/*" onChange={(event) => setSelectedImage(event.target.files[0])} />
              </label>

              <div className='form-buttons'>
                <Button className='submitButton' variant="primary" type="submit" >Submit</Button>
                <Button className='cancelButton' variant="outline-danger"  onClick={handleFormCancel}>Cancel</Button>
              </div>
            </form>
          )}
          {!selectedPost && (
          <>
            <Button className='button' variant="light" onClick={handleMyPosts}> My posts </Button>
          </>
        )}
           {selectedPost ? (
            <div>
              <SelectedPost selectedPost={selectedPost} cardShelter={cardShelter}/>   
              <div className='expanded-buttons'>
                  <Button className='expanded-button' id='expanded-button' variant="outline-primary" onClick={() => setSelectedPost(null)}>Edit</Button>
                  <Button className='expanded-button' id='expanded-button' variant="outline-danger" onClick={() => setSelectedPost(null)}>Close</Button>
                  <Button className='deleteButton' id='expanded-button' variant="outline-danger" onClick={() => handleDeletePost(selectedPost.id)}>Delete</Button> {}
              </div>
              
            </div>  
            ):(
              <div className='card-container'>
              {myPosts.length > 0 &&
              myPosts.map(post => (
                <Card key={post.id} className="custom-card" onClick={() => handleSelectedPost(post)} >
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
                      checked={post.adopted} 
                      onChange={(e) => handleMarkAsAdopted(post.id, e.target.checked)}
                      onClick={(e) => e.stopPropagation()} 
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
