import React, { useContext, useState} from 'react';
import './login.css';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useData } from '..';
// import { Context } from '../App';


// 
const Login = () => {
  const {setIsLoggedIn}= useData();

  const navigator = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Login successful!');
        setIsLoggedIn(true)
        navigator('/')  
      } else {
        console.error('Error logging in');
      }
    } catch (error) {
      console.error('Error:', error);
    }
   
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  return (
    // 
    
    <div className= "modalt">
      <div className="modal-contentt">
       
        <h2 className = "text-violet-500 font-mono ">Login</h2>
        <form 
        onSubmit={handleSubmit}
        >
           <div className="floating-labelt">
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="floating-labelt">
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
     
     
            <button className="custom-buttont  font-bold" type="submit" >
              Login
            </button>
            <div className='text-center pt-5'>
            Don't have an account? <span className='text-violet-500 cursor-pointer'>
              <Link className = "regt" to = "/signUp"> Register </Link>
              <Outlet/>
              </span>
            </div>
        </form>
      </div>
    </div>
  
//  </Context.Provider>
  
  );
};

export default Login;
