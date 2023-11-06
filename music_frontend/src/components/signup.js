import React, { useState } from 'react';
import './login.css';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState(
    {
      name: "",
      username: "",
      email: "",
      password: ""
    }
  );
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User registered successfully!');
        navigate('/login')
      } else {
        console.error('Error registering user');
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
    <div>
    
    <div className= "modalt">
      <div className="modal-contentt">
       
        <h2 className = "text-violet-500 font-mono font-bold text-xl">Register</h2>
        <form onSubmit={handleSubmit}>
        <div className="floating-labelt">
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="name">Name</label>
            </div>
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
                type="text"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email</label>
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
       
            <button className="custom-buttont" type="submit" >
              Sign Up
            </button>
            <div className='text-center'>
            Already have an account?<span>
              <Link className='regt' to = "/login"> Login </Link>
              <Outlet/>
              </span> 
            </div>
             
        </form>
      </div>
    </div>
  
  </div>
  
  );
};

export default SignUp;
