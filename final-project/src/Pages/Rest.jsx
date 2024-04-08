import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ResNav from '../components/resturant/ResNav'; 
import '../components/css/rest.css'
import Footer from '../components/Footer'
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

function Rest() {

  const { setUsername } = useContext(UserContext);
  const { username } = useContext(UserContext);
  const navigate = useNavigate();
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [categories, setCategories] = useState(['BBQ','Beef','Desserts','milkshake','Kottu','Pasta','rice','Rice & curry']);
  const [foods, setFoods] = useState([]);
  const [catClick , setCatClick ] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/foods')
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, []);

  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    if (cartMessage !== '') {
      const timer = setTimeout(() => {
        setCartMessage('');
      }, 3000); // Display the message for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [cartMessage]);

  const handleCategoryClick = (category) => {
    setCatClick(true);
    if (category === 'All') {
      setFilteredFoods(foods);
    } else {
      const filtered = foods.filter(food => food.category === category);
      setFilteredFoods(filtered);
    }
    toggleMenu();
  };

  const addToCart = async (productName, productPrice,username) => {
    if (!username) {
      setCartMessage("please log or sign before add to cart");
    } else {
      try {
        const response = await axios.post('http://localhost:5000/add-to-cart', {
          productId: productName,
          userId: username,
          price: productPrice,
        });
        setCartMessage(response.data.message);
      } catch (error) {
        console.error(error);
        setCartMessage('Error adding item to cart');
      }
    }
  };  

  return (
    <div>
      <ResNav/>

      <div className='res-con '>
        <div className="foods-filter">
          
        <div className={`mobile-menu`}>
            <button className="menu-button" onClick={toggleMenu}>
              <h1>Categories</h1>
              <img src={isMenuOpen ? '/img/Close.png' : '/img/menu.png'} style={{width:'35px',}} alt="" />
            </button>
            <div className={`filter-container ${isMenuOpen ? 'open' : ''}`}>
              <h1>Categories</h1>
              <div className="category-list">
                <div className='cat-1' onClick={() => handleCategoryClick('All')}>
                  <h2>ALL FOODS</h2>
                </div>
                {categories.map(category => (
                  <div className="cat-1" key={category} onClick={() => handleCategoryClick(category)}>
                    <div className="cat-1-img">
                      <img src={`/rest/foods/${category}.png`} alt="" />
                    </div>
                    
                    <div className="cat-img-title">
                      {category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="foods-container">
           { foods.length !== 0  ? (
           <>
              {catClick ? (
                    filteredFoods.map(food => (
                      <div className="food-card relative" key={food.id} >
                        <div className="food-img">
                        <div className='absolute z-30 text-white text-4xl bg-black rounded-full px-3 right-4 top-4 hover:bg-white hover:text-black cursor-pointer' onClick={() => addToCart(food.name, food.price,username)} >+</div>
                          <img src={`/rest/foods/${food.category}/${food.name}/${food.name}.jpg`} alt="" onClick={()=>{navigate(`/food/${food.name}`)}} />
                        </div>
                        <div className="food-txt" onClick={()=>{navigate(`/food/${food.name}`)}}>
                          <div className="food-title">
                            {food.name}
                          </div>
                          <div className="food-price">
                            Rs:{food.price}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    foods.map(food => (
                      <div className="food-card relative" key={food.id}>
                        <div className="food-img">
                        <div className='absolute z-30 text-white text-4xl bg-black rounded-full px-3 right-4 top-4 hover:bg-white hover:text-black cursor-pointer' onClick={() => addToCart(food.name, food.price,username)} >+</div>
                          <img src={`/rest/foods/${food.category}/${food.name}/${food.name}.jpg`} alt=""  onClick={()=>{navigate(`/food/${food.name}`)}} />
                        </div>
                        <div className="food-txt" onClick={()=>{navigate(`/food/${food.name}`)}}>
                          <div className="food-title">
                            {food.name}
                          </div>
                          <div className="food-price">
                            Rs:{food.price}
                          </div>
                        </div>
                      </div>
                    ))
              )}
           </>
           ):(
            <div className="w-full h-screen flex justify-center items-center food-db-error text-xl text-red-500 ">
              Connecting to database !!! 
            </div>
           )} 
          

          </div>
        </div>

        {cartMessage && <p className="cart-message">{cartMessage}</p>}

        <Footer/>
      </div>

    </div>

  )
}

export default Rest
