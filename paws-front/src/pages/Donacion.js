import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SelectedPost from '../components/SelectedPost';
import PostCard from '../components/PostCard'
import '../styles/Donacion.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { post, get, del, put } from '../utils/http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus , faPencilAlt, faTimes, faTrash, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';



  function Donacion(props) {
    const { isLoggedIn } = props;
    const { isShelter } = props;
    const [isFormExpanded, setIsFormExpanded] = useState(false);
    const [petName, setPetName] = useState('');
    const [petSex, setPetSex] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petRace, setPetRace] = useState('');
    const [petDescription, setPetDescription] = useState('')
    const [pictures, setPictures] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [myPosts, setMyPosts] = useState({
      activePosts: [],
      adoptedPosts: []
    });    
    const [postImage, setPostImage] = useState([])
    const [selectedPost, setSelectedPost] = useState(null);
    const [cardShelter, setCardShelter] = useState(null);
    const [cardPicture, setCardPicture] = useState([]);
    const [showMyPosts, setShowMyPosts] = useState(false);
    const token = localStorage.getItem('token');
    const config = {
              headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json', 
          }}

  
      const handleMyPosts = (e) => {
        if (e){
            e.preventDefault();
          }
        
          if (showMyPosts) {
            setShowMyPosts(false);
            return
          }
            else{
              get('/getMyPosts', config)
              .then(response => {
                console.log(response)
                console.log("posts retrieved")

                const activePosts = response.filter(post => !post.adopted);
                const adoptedPosts = response.filter(post => post.adopted);

                setMyPosts({
                  activePosts: activePosts,
                  adoptedPosts: adoptedPosts
                });
                
                setErrorMessage('')

                response.forEach((post) => {
                  const postId = post.id;
                  get(`/getProfilePicture/${postId}`, { responseType: 'arraybuffer' })
                    .then((imageResponse) => {
                      console.log('image retrieved');
                      const blob = new Blob([imageResponse], { type: 'image/jpeg' });
                      const blobUrl = URL.createObjectURL(blob);
                      setPictures((prevState) => ({
                        ...prevState,
                        [postId]: blobUrl,
                      }));
                    })
                    .catch((error) => {
                      console.error(error);
                      setErrorMessage('Failed to retrieve images');
                    });
                });
                
              })
              .catch(error => {
                console.error(error)
                setErrorMessage('Post retrieval failed. Please try again later.');
              });
            }
            setShowMyPosts(true)
       };
      
      const handleFormSubmit = (e) => {
        e.preventDefault();
      
        if (petAge < 0) {
          setErrorMessage("Age cannot be negative.");
          return;
        }

        if (petDescription.length > 150){
          setErrorMessage("Description too long");
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
            setPostImage([])
            setIsFormExpanded(false);
            setErrorMessage("");
  
            const formData = new FormData();
            formData.append("file", postImage);

            console.log([...formData]);

            fetch(`http://localhost:8080/uploadProfilePicture/${response.id}`, {
              method: "POST",
              body: formData,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((uploadResponse) => {
                if (uploadResponse.ok) {
                  console.log("Profile picture uploaded successfully:", uploadResponse);
                  toast.success("Post created successfully!");
                  handleMyPosts()
                } else {
                  throw new Error("Profile picture upload failed");
                }
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
            console.log("post deleted")
            toast.success("Post deleted successfully!");
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

      const handleMarkAsAdopted = (postId, checked) => {
        const body = {
          postID: postId,
          newStatus: checked,
        }; 
        put("/modifyAdoptedStatus", body, config)
          .then((data) => {
            console.log(data);
            // Update the state of the post with the new adopted status
            const updatedPosts = {
              activePosts: myPosts.activePosts.map(post =>
                post.id === postId ? { ...post, adopted: checked } : post
              ),
              adoptedPosts: myPosts.adoptedPosts.map(post =>
                post.id === postId ? { ...post, adopted: checked } : post
              )
            };
            setMyPosts(updatedPosts);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      
      
      return (
        <div className='donacion'>
          <Navbar isLoggedIn={isLoggedIn} isShelter={isShelter} />
          <div className='body'>
            {!selectedPost && !isFormExpanded && (
              <div className="button-container">
                <Card className="custom-card" onClick={() => setIsFormExpanded(true)}>
                  <Card.Body className="add-post-card">
                    <Card.Text className="add-post-text"> 
                    <FontAwesomeIcon icon={faPlus} className="add-post-icon" />
                      Add post
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className="custom-card" onClick={() => handleMyPosts()}>
                  <Card.Body className="see-post-card">
                    <Card.Text className="see-post-text">
                    {showMyPosts ? (
                    <>
                       <FontAwesomeIcon icon={faAngleUp} className="see-post-icon" /> My posts
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faAngleDown} className="see-post-icon" /> My posts
                    </>
                  )}  
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            )}
          {errorMessage && <div id="error-message">{errorMessage}</div>}
          {!selectedPost && isFormExpanded && (
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
                <input
                  type="number"
                  name="petAge"
                  value={petAge}
                  onChange={(event) => setPetAge(event.target.value)}
                  min="0"
                  max="100"
                  step="1"
                  required
                />
              </label>

              <label>
                Race<br/>
                <select name='petRace' value={petRace} onChange={(event) => setPetRace(event.target.value)} required>
                  <option value="">Select Race</option>
                  <option value="Undefined">Undefined</option>
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
           {selectedPost ? (
            <div>
              <SelectedPost selectedPost={selectedPost} cardShelter={cardShelter} cardPicture={cardPicture}/>   
              <div className='expanded-buttons'>
                  <Button className='expanded-button' id='expanded-button' variant="outline-primary" onClick={() => setSelectedPost(null)}>
                    <FontAwesomeIcon icon={faPencilAlt} className="button-icon" />Edit
                  </Button>
                  <Button className='expanded-button' id='expanded-button' variant="outline-danger" onClick={() => setSelectedPost(null)}> 
                    <FontAwesomeIcon icon={faTimes} className="button-icon" />Close
                  </Button>
                  <Button className='deleteButton' id='expanded-button' variant="outline-danger" onClick={() => handleDeletePost(selectedPost.id)}>
                    <FontAwesomeIcon icon={faTrash} className="button-icon" />Delete
                  </Button>
              </div>
              
            </div>  
            ):(
              !isFormExpanded && (
            <div className='card-container'>
              {showMyPosts && myPosts.activePosts.length > 0 &&
              myPosts.activePosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  picture={pictures[post.id]}
                  handleSelectedPost={handleSelectedPost}
                  handleMarkAsAdopted={handleMarkAsAdopted}
                  clickable={true}
                />
              ))
            }
            {showMyPosts && myPosts.adoptedPosts.length > 0 &&
              myPosts.adoptedPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  picture={pictures[post.id]}
                  handleSelectedPost={handleSelectedPost}
                  handleMarkAsAdopted={handleMarkAsAdopted}
                  clickable={true}
                />
              ))
            }

             </div>
              )
            )}             
        </div>
        <Footer/>
        <ToastContainer position='top-center' />
      </div>
    );
  }

  export default Donacion;
