import '../styles/SelectedPost.css'

export default function SelectedPost({ selectedPost, cardShelter }) {
  return (
    <div>
      <div className="post-expanded">
        <div className='post-info'>
          {/* Contenido ampliado del post */}
          <h1 className='post-title'>{selectedPost.petName}</h1>
          <p className='info'><b>Sex:</b> {selectedPost.sex ? 'Male' : 'Female'}</p>
          <p className='info'><b>Age:</b> {selectedPost.age}</p>
          <p className='info'><b>Race:</b> {selectedPost.race}</p>
          <p className='description'><b>Description:</b> {selectedPost.description}</p>
        </div>  
        <div className='shelter-info'>
          <h1 className='shelter-title'>{cardShelter.name}</h1>
          <p className='description'><b>Description:</b> {cardShelter.description}</p>
          <p className='info'><b>Number:</b> {cardShelter.phoneNumber}</p>
        </div>
      </div>     
    </div> 
  );
}
