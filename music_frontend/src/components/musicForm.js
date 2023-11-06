import './musicForm.css';
import { useRef } from 'react';

const CreateMusic = (props) => {
  const nameRef = useRef();
  const duration_msRef = useRef();
  const imageRef = useRef();
  const releaseDateRef = useRef();
  const artistNameRef = useRef();
  const artistImageRef = useRef();
  const lyricsRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current?.value
    const duration_ms = duration_msRef?.current.value;
    const image = imageRef.current?.files[0];
    const releaseDate = releaseDateRef.current?.value;
    const artistName = artistNameRef.current?.value;
    const artistImage = artistImageRef.current?.files[0];
    const lyrics = lyricsRef.current?.value;
    const artist = {
      'name': artistName
    }

    const data = {
      name,
      duration_ms,
      image,
      releaseDate,
      artistName,
      lyrics,
      artistImage,
      artist
      
    };
    try {

      if (props.edit){

        const response = await fetch(`http://localhost:4000/music/${props.music.musicId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });

              if (response.ok) {
              } else {
              }

      }
      else {
        const response = await fetch('http://localhost:4000/music', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });

              if (response.ok) {
                
              } else {
              }
              
        props.changeShow(!props.show)
      }
              
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      {
      (
      <div className= "modal">
        <div className="modal-content">
          <span className="close" 
          onClick={
            ()=>props.changeShow(!props.show)}
         
          >
            &times;
          </span>
          <h2>Create Music</h2>
          <form onSubmit={handleSubmit}
          >
            <div className="floating-label"> 
            <input type="text" id="name"  
            ref={nameRef} required
            defaultValue= {props.edit ? props.music.musicName : ""} />
            <label htmlFor="name">Music Name</label>
          </div>
          <div className="floating-label">
            <input type="number" id="duration_ms"  
            ref={duration_msRef} required 
            defaultValue={props.edit ? props.music.duration : ""}/>
            <label htmlFor="duration_ms">Duration</label>
          </div>
          <div className="floating-label">
            <input type="file" id="image_url" 
            ref={imageRef}   className="hidden-input"
             />
            <label htmlFor="image_url">Music Image</label>
          </div>
          <div className="floating-label">
            <input type="text" id="release_date" 
            ref={releaseDateRef}  required 
            defaultValue={props.edit? props.music.releasedDate: ""}/>
            <label htmlFor="release_date">Release Date</label>
          </div>
          <div className="floating-label">
            <input type="text" id="artist_name" 
            ref={artistNameRef} required 
            defaultValue={props.edit ? props.music.artistName: ""} />
            <label htmlFor="artist_name">Artist Name</label>
          </div>
          <div className="floating-label">
            <input type="file" id="artist_image" ref={artistImageRef}  className="hidden-input"  />
            <label htmlFor="artist_image">Artist Image</label>
          </div>
          <div className="floating-label"> 
            <input type="text" id="lyrics"  required
            ref={lyricsRef} 
            defaultValue= {props.edit ? props.music.lyrics : ""} 
            />
            <label htmlFor="lyrics">Lyrics</label>
          </div>
              <button className="custom-button" type="submit" >
                Submit
              </button>
          </form>
        </div>
      </div>
    )}
    </div>
    
    
  );
};

export default CreateMusic;