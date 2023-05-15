import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SelectedPost from '../components/SelectedPost';
import '../styles/Donacion.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';
import { post, get, del, put } from '../utils/http';
import axios from 'axios';




  function Donacion(props) {
    const { isLoggedIn } = props;
    const { isShelter } = props;
    const [isFormExpanded, setIsFormExpanded] = useState(false);
    const [petName, setPetName] = useState('');
    const [petSex, setPetSex] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petRace, setPetRace] = useState('');
    const [petDescription, setPetDescription] = useState('')
    const [profilePictures, setProfilePictures] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [myPosts, setMyPosts] = useState([]);
    const [postImage, setPostImage] = useState([])
    const [selectedPost, setSelectedPost] = useState(null);
    const [cardShelter, setCardShelter] = useState(null);
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
                console.log("posts retrieved")
                setMyPosts(response);
                setErrorMessage('')

                myPosts.forEach(post => {
                const postId = post.id;
                handleGetProfilePictures(postId);
              });
                
              })
              .catch(error => {
                console.error(error)
                setErrorMessage('Post retrieval failed. Please try again later.');
              });
       };
      
       const handleGetProfilePictures = (id) => {
        get(`/getProfilePicture/${id}`, { responseType: 'arraybuffer' })
          .then(response => {
            console.log('images retrieved')
            const blob = new Blob([response], { type: 'image/jpeg' }); // Adjust the 'type' accordingly
            const blobUrl = URL.createObjectURL(blob);
            setProfilePictures((prevState) => ({
            ...prevState,
            [id]: blobUrl,
         }));
            
          })
          .catch(error => {
            console.error(error);
            setErrorMessage('Failed to retrieve images');
          });
      };
      

      const handleFormSubmit = (e) => {
        e.preventDefault();
      
        if (petAge < 0) {
          setErrorMessage("Age cannot be negative.");
          return;
        }
      
        const body = {
          petName: petName,
          age: petAge,
          sex: petSex === "male",
          race: petRace,
          description: petDescription,
        };
      
        post("/createPost", body, config)
          .then((response) => {
            console.log(response);
            console.log("post created")
            setPetName("");
            setPetSex("");
            setPetAge("");
            setPetRace("");
            setPetDescription("");
            setIsFormExpanded(false);
            setErrorMessage("");
  
            const formData = new FormData();
            formData.append("file", postImage);

            console.log([...formData]); // Convert FormData to an array and log it

            const uploadConfig = {
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data',
                  
              }
            }
            post(`/uploadProfilePicture/${response.id}`, formData, uploadConfig)
              .then((uploadResponse) => {
                console.log("Profile picture uploaded successfully:", uploadResponse);
                
                handleMyPosts();
              })
              .catch((uploadError) => {
                console.error("Profile picture upload failed:", uploadError);
                setErrorMessage("Failed to upload profile picture. Please try again later.");
              });
          })
          .catch((error) => {
            console.error(error);
            setErrorMessage("Post creation failed. Please try again later.");
          });
      };
      
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
            const updatedPosts = myPosts.filter(post => post.id !== postId);
            setMyPosts(updatedPosts);
            setSelectedPost(null)
            
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
                <input type="file" accept="image/*" onChange={(event) => setPostImage(event.target.files[0])} required />
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
                  <Card.Img className='card-img'variant="top" src={profilePictures[post.id]} alt={post.petName} />
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
