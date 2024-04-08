import React, { useState , useContext } from 'react';
import axios from 'axios';
import '../components/signUp.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png'
import validations from '../components/SignupValidation';
import { UserContext } from '../components/UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Whatsapp from '../components/Whatsapp';

function SignUp() {

  const { setUsername } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    com_pass:'',
    mobile: '',
    agree: ''
  });
  
  const navigate = useNavigate();

  const [errors,setErrors] = useState({});
 
  const handleInputChange = (event) => {
    setFormData(prev => ({...prev, [event.target.name]: event.target.value}));
  };
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validations(formData));
    if (errors.name === "" && errors.email === "" && errors.password === "" && errors.mobile === "" ) {
      axios.post('http://localhost:5000/signup', formData )
      .then(res => { 
        setUsername(formData.name);
        navigate('/');
      })
      .catch(err => console.log(err));

    }
  };
  
  

  return (
    <div className='container-sign-123'>
      <Whatsapp/>
        <div className="box">
          <div className="form-container">
              <div className="heading">
                <img src={logo} alt="" className='logoS' />
                <h2>Let's Start</h2>
              </div>
              <form action="" method="post" className='signupFrm' onSubmit={handleSubmit}>
                  <div className="inp relative ">
                    <label htmlFor="">Username</label>
                    <input 
                      type="text" 
                      placeholder='Sajith Premadasa' 
                      className='txt' 
                      name='name' 
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && <span className='valiErr'>{errors.name}</span>}
                  </div>
                  <div className="inp relative">
                    <label htmlFor="">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="" 
                      placeholder='sajith@gmail.com' 
                      className='txt' 
                      value={formData.email}
                      onChange={handleInputChange} 
                    />
                    {errors.email && <span className='valiErr'>{errors.email}</span>}
                  </div>
                  <div className="inp relative">
                    <label htmlFor="">Password</label>
                    <input 
                      type="password" 
                      name="password" 
                      placeholder='**********' 
                      className='txt' 
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    {errors.password && <span className='valiErr'>{errors.password}</span>}
                  </div>
                  <div className="inp relative">
                    <label htmlFor="">Comfirm Password</label>
                    <input 
                      type="password" 
                      name="com_pass" 
                      placeholder='**********' 
                      className='txt' 
                      value={formData.com_pass}
                      onChange={handleInputChange}
                    />
                    {errors.com_pass && <span className='valiErr'>{errors.com_pass}</span>}
                  </div>
                  <div className="inp relative">
                    <label htmlFor="">Mobile Number</label>
                    <input 
                      type="text" 
                      name="mobile"
                      placeholder='0761512339' 
                      className='txt' 
                      value={formData.mobile}
                      onChange={handleInputChange}
                    />
                    {errors.mobile && <span className='valiErr z-10'>{errors.mobile}</span>}
                  </div>
                  
                  <div className="btnSignup">
                    <button type="submit" className='signupb' >Sign-Up</button>
                  </div>

                  <div className="agree relative">
                    <input 
                      type="checkbox" 
                      name="agree" 
                      checked={formData.agree}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="">I agree to the website's Privacy & Policy & Terms and Conditions</label>
                    {errors.agree && <span className='valiErr z-10'>{errors.agree}</span>}
                  </div>
                  
              </form>
              <p className='linkToLog'>Alredy have an account ? <Link to="/login">Sign in</Link></p>

          </div>
          <div className="banner">
            <Link to="/">
              <FontAwesomeIcon icon={faXmark} className='closeSignup'/>
            </Link>
          </div>
        </div>
    </div>
  )
}
export default SignUp
