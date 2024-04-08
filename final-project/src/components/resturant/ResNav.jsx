import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Cart from './Cart';
import axios from 'axios';
import '../css/resnav.css';
import Food from '../../Pages/Food';

function ResNav() {
  const { setUsername, username } = useContext(UserContext);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const [selectedOption, setSelectedOption] = useState('');
  const options = ['Dashboard', 'LogOut'];
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState('');

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const handleItemClick = (name) => {
    setSelectedItem(name);
    setSearchResults([]);
    navigate(`/food/${name}`);
  };

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

 
  const handleS = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    searchFood(searchTerm);
  };

  async function searchFood(searchTerm) {
    if (searchTerm.length === 0) {
      // Handle empty search term
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/search', { name: searchTerm });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  }

  return (
    <div>
      <div className="res-nav-con">
        <div className="logo">
          <Link to='/resturant'>
            <img src={'/rest/logo.png'} alt="" />
          </Link>
        </div>
        <div className="search relative">
          <input 
            type="text" 
            name="search" 
            id="search" 
            value={search}
            onChange={handleS} 
            placeholder='Search'
          />

          {searchResults.length > 0 && (
            <ul className="search-suggestions">
              {searchResults.map(result => (
                <li key={result.id} onClick={() => handleItemClick(result.name)} >{result.name}</li>
              ))}
            </ul>
          )}

          <button className='search-btn' onClick={searchFood}>
            <img src={'/rest/search.png'} alt="" className='search-png top-0 ' />
          </button>
        </div>
        <div className="res-btns">
          {username ? (
            <div className='rest-log'>
              <div className='rest-log-cart'>
                <button onClick={openCart}>Cart</button>
                <img src={'rest/cart.png'} alt="" />
                <Cart isOpen={isCartOpen} onClose={closeCart} />
              </div>
              <select value={selectedOption} onChange={handleChange} className='resnavu'>
                <option value="">Hello, {username}</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <Link to='/' className='hover:text-orange-500 resnavh'>
                Home
              </Link>
            </div>
          ) : (
            <div className="buttons">

              <Link to="/login">
                <button className='btn bsign'>Signin</button>
              </Link>
              <Link to="/signup">
                <button className='btn bsignout'>Join Now</button>
              </Link>
              <Link to='/' className='hover:text-orange-500 resnavh'>
                Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResNav;
