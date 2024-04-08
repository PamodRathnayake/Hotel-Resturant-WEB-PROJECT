import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer';
import ResNav from '../components/resturant/ResNav';
import '../components/css/food.css'
import { UserContext } from '../components/UserContext';
import { useContext } from 'react';
import axios from 'axios';

function Food() {
    
    const navigate = useNavigate();
    const { username } = useContext(UserContext);
    const [uname , stUname ] = useState(username);
    const { name } = useParams();
    const [food,setFood] = useState([]);
    const [err,setErr] = useState('');
    const [topImage, setTopImage] = useState(`/rest/foods/${food.category}/${food.name}/${food.name}.jpg`);
    const [cartMessage, setCartMessage] = useState('');
    const [related,setRelated] = useState([]);
    const [ratings, setRatings] = useState([]);

    useEffect(()=>{
        if (name.trim() !== '') {
            axios
                .post(`http://localhost:5000/getReviews`, { name })
                .then((response) => {
                    setRatings(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching food data:', error);
                    setRatings([]);
                });
        } else {
            setErr("Something went wrong!");
        }
    },[name]);

    useEffect(() => {
        if (name.trim() !== '') {
            axios
                .post(`http://localhost:5000/food`, { name })
                .then((response) => {
                    setFood(response.data);
                    setTopImage(`/rest/foods/${response.data.category}/${response.data.name}/${response.data.name}.jpg`);
                    if (response.data.category !== '') {
                        setRelated([]);
                        fetchRelatedFoods(response.data.category);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching food data:', error);
                    setFood(null);
                });
        } else {
            setErr("Something went wrong!");
        }
    }, [name]);
    
    const fetchRelatedFoods = (category) => {
        axios
            .post('http://localhost:5000/selectRelatedFoods', { category })
            .then((response) => {
                setRelated(response.data);
            })
            .catch((error) => {
                console.error("Error getting related foods:", error);
                setRelated(null);
            });
    };
    
    
    const handleImageClick = (imagePath) => {
        setTopImage(imagePath);
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

      useEffect(() => {
        if (cartMessage !== '') {
          const timer = setTimeout(() => {
            setCartMessage('');
          }, 3000); // Display the message for 3 seconds
          return () => clearTimeout(timer);
        }
      }, [cartMessage]);
      
    //   useEffect(()=>{
    //     if(username.trim() === ''){
    //         setErr({username:"plese reloging and try again !!!"});
    //     }
    //   },[username]);
    
      const [quentity,setQuentity] = useState(1);
      const setQuentityUP = () => {
        setQuentity(quentity+1);
      };
      const setQuentityDown = () => {
        if(quentity!==1){
            setQuentity(quentity-1);
        }
      };
    
  return (
    <div>
        <ResNav/>
        <div className="food-con pt-14">
            { err === '' ? (
                <>
                    <div className="food-hero">
                        <div className="food-img-con">
                            <img src={topImage} alt="" />
                        </div>
                        <div className="food-text">
                            <div className="food-text-1">
                                <h2>{name}</h2>
                                <p>{food.description}</p>
                            </div>
                            <div className="food-price">
                                <p>Rs.{food.price}</p>
                            </div>
                            <div className="food-quentity">
                                <button onClick={setQuentityUP}>+</button>
                                <div className="food-quentity-q">{quentity}</div>
                                <button onClick={setQuentityDown}>-</button>
                            </div>
                            <div className="food-img-list">
                                <img src={`/rest/foods/${food.category}/${food.name}/${food.name}.jpg`} alt="" onClick={() => handleImageClick(`/rest/foods/${food.category}/${food.name}/${food.name}.jpg`)}/>
                                <img src={`/rest/foods/${food.category}/${food.name}/2.jpg`} alt="" onClick={() => handleImageClick(`/rest/foods/${food.category}/${food.name}/2.jpg`)}/>
                                <img src={`/rest/foods/${food.category}/${food.name}/3.jpg`} alt="" onClick={() => handleImageClick(`/rest/foods/${food.category}/${food.name}/3.jpg`)}/>
                            </div>                    
                            <div className="btn-con">
                            <Link
                                onClick={!username ? () => setCartMessage("please log or sign before buy") : null}
                                to={!username ? null : `/BuyFoods/${encodeURIComponent(username)}/${(encodeURIComponent(food.price)*quentity)}`}
                                className='btn-buy'
                            >
                                <button>Buy Now</button>
                            </Link>
                                <button className='btn-cart' onClick={() => addToCart(food.name, food.price,username)}>Add to Cart</button>
                            </div>

                            {cartMessage && <p className="cart-message">{cartMessage}</p>}
                        </div>
                    </div>
                    <div className="food-reviews">
                        <h2>Reviews And Ratings</h2>
                        <div className="reviews-con">
                            {ratings.length === 0 ? (
                                <div className='no-reviews'>
                                    No reviews found.
                                </div>
                            ) : (
                                <div className="reviews-list">
                                    {ratings.map((rating, index) => (
                                        <div className="review" key={index}>
                                            <p className='rev-name'>
                                                user@ {rating.name}
                                            </p>
                                            <p className='star-rate'>
                                                {Array.from({ length: rating.rate }).map((_, i) => (
                                                    <img  src={'/rest/star.png'} alt="" className='rev-star'/>
                                                ))}
                                            </p>
                                            <p className='rev-com'>
                                                {rating.comment}
                                            </p>
                                            <p className='rev-date'>
                                                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(rating.date))}
                                            </p>

                                        </div>
                                    ))}
                                </div>  
                            )}
                        </div>
                    </div>
                    <div className="food-related">
                        
                        {related.map(r => ( 
                            r.name !== food.name && (
                                <div className="food-card relative" key={r} >
                                    <div className="food-img">
                                        <div className='absolute z-10 text-white text-4xl bg-black rounded-full px-3 right-4 top-4 hover:bg-white hover:text-black cursor-pointer' onClick={() => addToCart( r.name, r.price , username )}  >+</div>
                                        <img src={`/rest/foods/${r.category}/${r.name}/${r.name}.jpg`} alt=""  onClick={()=>{navigate(`/food/${r.name}`)}} />
                                    </div>
                                    <div className="food-txt">
                                        <div className="food-title">
                                            {r.name}
                                        </div>
                                        <div className="food-price">
                                            Rs:{r.price}
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}

                    </div>
                </>
            ):(
                <div className="err-food">
                    <Link to="/resturant">{err}</Link>
                </div>
            ) }
            
            
            <Footer/>
        </div>
    </div>
  )
}

export default Food
