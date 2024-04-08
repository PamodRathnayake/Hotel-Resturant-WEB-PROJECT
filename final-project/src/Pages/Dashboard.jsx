import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../components/UserContext';
import NavMain from '../components/NavMain';
import Footer from '../components/Footer';
import '../components/dashboard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Whatsapp from '../components/Whatsapp';

function Dashboard() {
  const { username } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [err,setErr] = useState('');

// Define a function to fetch user data
  const fetchUserData = () => {
    if (username.trim() !== '') {
      axios
        .get(`http://localhost:5000/userdata?name=${username}`)
        .then((response) => {
          setUser(response.data);
          setError(''); // Clear any previous errors
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setUser(null);
          setError('Error fetching user data. Please try again later.');
        });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [username]);

  const handleSubmit = async  (e) => {
    e.preventDefault();
    try{
      if(newPassword===confirmPassword){
        if(newPassword.length > 8){
          setErr("");
          const response = await axios.put('http://localhost:5000/resetPass',{ username, newPassword});
          console.log(response.data);
          setShowPopup(false);
          setConfirmPassword('');
          setNewPassword('');
          fetchUserData();
        }else{
          setErr("Password must grater than 8 char")
        }
      }else{
        setErr("Password didn't match");
      }
    }catch (error){
      console.error('Error updating password',error);
    }
    
  };

  const [reviewd,setReviewd] = useState([]);
  const [orders, setOrders] = useState([]);
  const [readyToReview , SetReadyToReview] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/userOrders/${username}`)
      .then(response => {
        if (response.data.message === 'empty') {
          setOrders([]);
        } else {
          const ordersData = response.data;
          setOrders(ordersData);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [username]);

  useEffect(()=>{
    axios.get(`http://localhost:5000/getNonReview/${username}`)
      .then(response =>{
        setReviewd(response.data);
      })
      .catch(error=>{
        console.error("error getting reviews data",error);
      })
  },[username]);


  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/averageRating/${username}`);
        setRatings(response.data);
      } catch (error) {
        console.log(" cannot load reviews !!! ");
      }
    };

    fetchRatings();
  }, [username]);


 
    const [rating, setRating] = useState(0);
    const [reviewInputs, setReviewInputs] = useState([]);
  
    const handleRatingChange = (value) => {
      setRating(value);
    };
    
    useEffect(() => {
      setReviewInputs(Array(reviewd.length).fill(''));
    }, [reviewd]);

    const handleInputChange = (e, index) => {
      const newReviewInputs = [...reviewInputs];
      newReviewInputs[index] = e.target.value;
      setReviewInputs(newReviewInputs);
    };
    
    const handleSubmitReview = async (index) => {
      const reviewText = reviewInputs[index];
      
      if (rating === 0) {
          alert('Please select a rating before submitting.');
      } else if (!reviewText.trim()) {
          alert('Please enter a review before submitting.');
      } else {
          try {
              const response = await axios.post('http://localhost:5000/AddReview', {
                  product_name: reviewd[index].product_name,
                  username,
                  rating,
                  review_text: reviewText,
              });
  
              console.log('Data inserted:', response.data);
              window.location.reload(); // Reload only on successful response
          } catch (error) {
              console.error('Error inserting data:', error);
          }
      }
  };
  

  return (
    <div>
      <NavMain />
      <Whatsapp/>
      {username ? (
        <div className="">

          {user ? ( // Check if user data is available, if yes, display the dashboard
            <>
              <div className="dash_container">
                <div className="dash_profile dash">
                  <h2>Profile</h2>
                  <div className="dash_points">
                    <p>{username}</p>
                    <div className="dash_points_count">{user.points}</div>
                  </div>
                </div>
                <div className="dash_setting dash">
                  <h3>Account Setting</h3>
                  <div className="dash_setting_info">
                    <div className="dash_setting_info_title">
                      <p>Login Email</p>
                      <p>Login Mobile Phone</p>
                      <p>Password</p>
                    </div>
                    <div className="dash_setting_info_data">
                      <p>{user.email}</p>
                      <p>{user.mobile}</p>
                      <p>{user.password}</p>
                    </div>
                    <div className="dash_setting_info_change">
                      <p onClick={() => setShowPopup(true)}>Change password</p>
                    </div>
                  </div>
                </div>
                <div className="dash_order dash">
                  <h3>Your Orders</h3>
                  { orders.length === 0 ? 
                    <div className='h-20 overflow-hidden w-full flex items-center justify-center text-xl text-orange-500'>
                      No Previous Orders Still Yet !!!
                    </div>
                  : 
                    <div className="dash-orders-list">
                      <div className="dash-orders-list-price">
                        <h4>Price</h4>
                        {orders.map(order => (
                          <p key={order.id}>
                            Rs.{order.price}
                          </p>
                        ))}                       
                      </div>
                      <div className="dash-orders-list-date">
                        <h4>Date</h4>
                        {orders.map(order => (
                          <p key={order.id}>
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(order.date))}
                          </p>
                        ))}  
                      </div>
                      
                    </div>
                  }                
                  
                </div>

                <div className="dash_add_review">
                  <h3>Make review</h3>
                  { reviewd.length === 0  ? 
                    <div className="no-rev">
                      No Items to review
                    </div>
                  :
                    <div className="rev">
                      {/* reviewd */}
                      {reviewd.map((rev,index) =>(
                        <div key={index} className='readyRev'>
                          <div className="readyr1">
                            <div className="rev-img">
                              <img src={`/rest/foods/${rev.product_name}.jpg`} alt="" />
                            </div>
                            <div className="rev-txt">

                              {rev.product_name}
                              <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((value) => (
                                  <label key={value}>
                                    <input
                                      type="radio"
                                      name="rating"
                                      value={value}
                                      checked={rating === value}
                                      onChange={() => handleRatingChange(value)}
                                    />
                                    <span className={`star ${rating >= value ? 'gold' : ''}`}>&#9733;</span>
                                  </label>
                                ))}
                              </div>

                            </div>
                          </div>
                          <div className="readyr2">
                            <input
                              type="text"
                              placeholder='your review here'
                              value={reviewInputs[index]}
                              onChange={(e) => handleInputChange(e, index)}
                            />
                            <button onClick={() => handleSubmitReview(index)}><img src={'/rest/send.png'} alt="" /></button>
                          </div>
                          
                        </div>
                      ))}
                    </div>
                  }
                </div>

                <div className="dash_reviews">
                  <h3>Your Reviews</h3>
                  {ratings.length === 0 ? (
                    <p>No reviews found.</p>
                  ) : (
                    <ul>
                      {ratings.map((rating, index) => (
                        <li key={index}>
                          <div className="rew_img">
                            <img src={`/rest/foods/${rating.p_name}.jpg`} alt="" />
                          </div>
                          <div className="rew_txt">
                            <h2>{rating.p_name}</h2>
                            <p className='rew-rate'>
                              {Array.from({ length: rating.rate }).map((_, i) => (
                                <img key={i} src={'rest/star.png'} alt="" className='rev-star'/>
                              ))}
                            </p>
                            <p className='rew-com'>{rating.comment}</p>
                            <p className='rew-date'>
                              {/* {rating.date} */}
                              {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(rating.date))}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

              </div>
              
            </>
            
          ) : (
            <div>Loading...</div>
          )}

         
        </div>
      ) : (
        <div className="w-full relative bg-black/50" style={{height:"75vh"}}>
          <div className="w-full h-full flex items-center justify-center">
            <Link to="/login" className='text-white text-xl'>An Error occured please Signup or login</Link>
          </div>
          <Link to="/" className='absolute z-10 right-0 bottom-0 p-16'>Back to Home</Link>
        </div>
      )}



      {/* Popup box */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Change Password</h3>
            <form type='post' onSubmit={handleSubmit}>
              <label htmlFor="password">New Password</label>
              <input 
                type="password" required
                id="password" 
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" required
                id="confirmPassword" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {err && <span className='text-red-500 font-semibold pb-2'>{err}</span>}
              <button onClick={() => { setShowPopup(false); setErr(''); setNewPassword(''); setConfirmPassword('') }}>Close</button>
              <button type="submit">Save Changes</button>
            </form>
          </div>
      </div>
      )}

      {/* {error && alert(error)} */}

      <div className="dash-foot mt-12">
        <Footer />
      </div>

    </div>
  );
}

export default Dashboard;
