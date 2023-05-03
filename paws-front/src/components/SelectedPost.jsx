export default function SelectedPost({ selectedPost, cardShelter }) {
  return (
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
          <h1 className='shelter-title'>{cardShelter.name}</h1>
          <p className='description'>Description: {cardShelter.description}</p>
          <p className='info'>Number: {cardShelter.phoneNumber}</p>
        </div>
      </div>     
    </div> 
  );
}
