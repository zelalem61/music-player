import React, { useState, useEffect, useRef } from 'react';
import './musicCard.css'; 
import MusicForm from './musicForm';
import Axios from 'axios';

const MusicCard = (props) => {
  const [showActions, setShowActions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
 
  const actionsRef = useRef(null);
  
  const toggleActions = () => {

    setShowActions(!showActions);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setOnEdit(true)
  };
  const handleClickOutside = (event) => {
    if (actionsRef.current && !actionsRef.current.contains(event.target)) {
      setShowActions(false);
    }
  };

  const handleDelete = () => {
    Axios.delete(`http://localhost:4000/music/${props.musicId}`)
      .then(response => {
        setShowActions(false);
      })
      
      .catch(error => {
        console.error('Error deleting music:', error);
      });
      
       
  };
  

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="music-card">
      <div className="music-image">
        <img src={props.image_url} alt = ""/>
      </div>
      <div className="music-details">
        <h3>{props.musicName}</h3>
        <p>{props.artistName}</p>
      </div>
      {props.eclipse && (
        <div className="actions" ref={actionsRef}>
          <div className="ellipsis" onClick={toggleActions}>&#8942;</div>
          {showActions && (
            <div className="actions-popup">
              <button onClick={toggleModal}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      )}
            {isModalOpen &&
                        <MusicForm 
                                show = {isModalOpen} 
                                changeShow = {setIsModalOpen} 
                                edit = {onEdit}  
                                music = {props}/>}
        </div>
  );
};

export default MusicCard;
