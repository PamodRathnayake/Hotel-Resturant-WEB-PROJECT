import React, { useState , useContext } from 'react';
import '../components/signUp.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../components/UserContext';
import Whatsapp from '../components/Whatsapp';

function Login() {

    const { setUsername } = useContext(UserContext);


    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const [errors,setErrors] = useState('');
    
    const navigate = useNavigate();

    const handleInputChange = (event) => {
      setFormData(prev => ({...prev, [event.target.name]: event.target.value}));
    };
    
    
    const handleSubmit = async (e) => {
      e.preventDefault();
        axios.post('http://localhost:5000/login', formData )
        .then(res => { 
          if (res.data.success) {
            setUsername(res.data.username);
            navigate('/');
          }else{
            setErrors("Username or password error");
          }
        })
        .catch(err => console.log(err));

    };



  return (
    <div className='container-sign-123'>
      <Whatsapp/>
        <div className="box">
          <div className="form-container">
              <div className="heading">
                <img src={logo} alt="" className='logoS' />
                <h2>Welcome Back</h2>
              </div>
              <form action="" method="post" className='signupFrm' onSubmit={handleSubmit}>
                  <div className="inp">
                    <label htmlFor="">Email</label>
                    <input 
                      type="email" required
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange}
                      placeholder='sajith@gmail.com' 
                      className='txt' 
                    />
                  </div>
                  <div className="inp">
                    <label htmlFor="">Password</label>
                    <input 
                      type="password" required
                      name="password" 
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder='**********' 
                      className='txt'
                    />
                  </div>
                  
                  <div className="btnSignup">
                    <button type="submit">Login</button>
                  </div>

                  {errors && <span className='text-red-500 text-sm'>{errors}</span>}
                  
              </form>

              <p className='linkToLog'>You Don't have an account ? <Link to="/signup">Join now</Link></p>

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
export default Login
