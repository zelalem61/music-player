import React, { useState } from 'react';
import './header.css';
import plus from '../images/plus.png';
import CreateMusic from './musicForm';
import { Outlet, Link } from "react-router-dom";
import {  useData } from '../index';


const Header = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const {isLoggedIn} = useData();

 
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  

  return (
    <nav className="bg-gray-800 bg-opacity-0 p-4">
      <div className="container mx-auto">
        <div className="flex justify-end items-center">
       <div className='nav'>

              <>
                  <div className='navigator'>
                    <Link className='padd' to = "/"> Home </Link>
                    {isLoggedIn ? <Link className='padd' to = "/"> Sign Out </Link> :
                      <Link className='padd' to = "/login"> Login </Link>
                     }
                    
                  </div>
              
              <Outlet />
              </>
              <div className='create' onClick={toggleModal}>
              {isLoggedIn && <img className='plus' src={plus} alt='create music' />}
              </div>
         </div>  
          
        </div>
      </div>
      {isModalOpen && <CreateMusic show = {isModalOpen} changeShow = {setIsModalOpen}/>}
    </nav>
  );
};

export default Header;





