import React from 'react';
import './gridScreen.css'; 
import MusicPlayerPointer from './progressIndicator';
import MusicCard from './musicCard';
import Avatar from './avatar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import next from '../images/forward.png';
import back from '../images/back.png';
import pause from '../images/pause-button.png';
import Header from './header.js';



const GridScreen = () => {
  const [data, setData] = useState(null);
  const [selectedMusic, setSelectedMusic] = useState();
  const [selectedArtist, setSelectedArtist] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLyrics, setSelectedLyrics] = useState();

  

  useEffect(() =>{
    axios.get('http://localhost:4000/music')
    .then(response => {
      setData(response.data)
      if (response.data && response.data.length > 0){
        setSelectedMusic(response.data[0].name)
        setSelectedArtist(response.data[0].artist.name)
        setSelectedImage(response.data[0].image_url)
        setSelectedLyrics(response.data[0].lyrics)
      }
    })
    .catch(error => {
      console.error('Error on feching data', error)
    });
}, [])

const handleMusicClick = (item) => {
  setSelectedMusic(item.name);
  setSelectedArtist(item.artist.name);
  setSelectedImage(item.image_url)
  setSelectedLyrics(item.lyrics)
};

  return (
    <div className="grid-container">7
      <div className="left-sidebar">
  <div className="scrollable-content">
  {data && data.map((item) => (
  <div key={item._id} onClick={() => handleMusicClick(item)}>
    <MusicCard musicName={item.name} artistName={item.artist && item.artist.name} image_url={item.image_url} eclipse={true} duration = {item.duration_ms} releasedDate = {item.release_date} musicId = {item._id} lyrics = {item.lyrics}/>
  </div>
))}

  </div>
</div>

      
      <div className="main-content">
        <div className='header'>
          <Header/>
        </div>
          <div className="music-container">
          <div className="music-info">
            <h2 className="music-name">{selectedMusic}</h2>
            <br/>
            <div className="music-lines">
            <div className="lyrics">
                <pre style={{ whiteSpace: 'pre-line' }}>  &ldquo;{selectedLyrics}&rdquo;</pre>
            </div>
             
            </div>
          </div>
          
          </div>
          <div className="popular-music-container">
            <h2>Popular Artists</h2>
              <div className='avatar'>
                {data && data.map((item,index) => (
                  <Avatar key={item.id} imageUrl = {item.artist && item.artist.image_url} text = {item.artist && item.artist.name}/>
                ))}
                
              </div>
          </div>
      </div>                                      
      
      <div className="bottom-content">
        <div className="bottom">
            <div className='playing-music'>
              <MusicCard musicName = {selectedMusic} artistName = {selectedArtist} image_url = {selectedImage} eclipse = {false}/>
            </div>
            <div className='next-back'>
              <img src={back} alt='back icon'/>
              <img src={pause} alt='pause icon'/>
              <img src={next} alt='next icon'/>
            </div>
              <div className='pointer'> 
                  <MusicPlayerPointer  currentTime={10} duration={30} width={400}/>
              </div>
              <div className='volume'>
                  <MusicPlayerPointer  currentTime={10} duration={30} width={100}/>
              </div>
        </div> 
    
      </div>
    </div>
  );
}

export default GridScreen;
