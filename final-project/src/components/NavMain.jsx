import React, { useContext , useState } from 'react';
import './navMain.css'
import logo from '../assets/img/logo.png'
import { Link , useNavigate} from 'react-router-dom';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { UserContext } from './UserContext';

const NavMain = () => {

  const { setUsername } = useContext(UserContext);

  const { username } = useContext(UserContext);

  const [selectedOption, setSelectedOption] = useState('');

  const options = ['Dashboard', 'LogOut'];
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (selectedValue === 'Dashboard') {
      navigate('/profile');
    } else if (selectedValue === 'LogOut') {
      setUsername('');
      navigate('/');
    }
  };

  return (
    <div className='nav-container'>
      <div className="logo">
        <Link to='/'><img src={logo} alt="" className='logo-img cursor-pointer' /></Link>
      </div>

        {username ? ( // Check if username is available, if yes, display the username
           <div className='mr-12 ml-4 flex items-center'>
            <FontAwesomeIcon icon={faUser} className='ico' />
            <select value={selectedOption} onChange={handleChange}>
              <option value="">Hello , {username}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ) : ( // If username is not available, show login and signup buttons

        <div className="buttons">
          <Link to="/login">
            <button className='btn bsign' >
              <FontAwesomeIcon icon={faUser} className='ico'/>
              Sign in 
            </button>
          </Link>
          <Link to="/signup">
            <button className='btn' >Join Now</button>
          </Link>
        </div>
        )}
      
    </div>
  )
}

export default NavMain