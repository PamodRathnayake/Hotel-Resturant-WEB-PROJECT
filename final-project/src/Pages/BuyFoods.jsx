import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import ResNav from '../components/resturant/ResNav';
import Footer from '../components/Footer';
import '../components/css/buy.css'
import axios from 'axios';

function BuyFoods() {
  
  //hnh

  const { data1, data2 } = useParams();
  const name = decodeURIComponent(data1);
  const [amount, setAmount] = useState(Number(decodeURIComponent(data2)));
  const [foodlist,setFoodlist] = useState([]); 
  const [addupdate , setAddupdate] = useState('');
  const [Isalready,SetIsalready] = useState(true);
  const [IsNew,SetIsnew] = useState(false);
  const [isOrder,setIsOrder] = useState(false);
  const [isAddressSet , SetIsAddressSet] = useState(false);
  const [cartMessage, setCartMessage] = useState('');
  const [loading,setLoading] = useState(false);

  const [formData, setFormData] = useState({
    
    city: '',
    address: '',
    telephone: '',
    name: name ,
    amount:amount,
  });

  const [errors, setErrors] = useState({
   
    city: '',
    address: '',
    telephone: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/selectFoods/${name}`)
      .then(response => {
        setFoodlist(response.data);
      })
      .catch(error => {
        console.error(error);
        // setCartMessage(" 404 error !! go back and try again");
      });
  }, [name]);

  useEffect(() => {
    if (addupdate !== '') {
      const timer = setTimeout(() => {
        setAddupdate('');
      }, 3000); // Display the message for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [addupdate]);

  useEffect(() => {
    axios.get(`http://localhost:5000/userAdd/${name}`)
      .then(response => {
        setFormData(response.data);
        if (response.data.message === 'empty') {
          SetIsalready(false);
          SetIsnew(true);
        } else {
          SetIsalready(true);
          SetIsnew(false);
          SetIsAddressSet(true);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [name]);
  

  useEffect(() => {
    if (cartMessage !== '') {
      const timer = setTimeout(() => {
        setCartMessage('');
      }, 3000); // Display the message for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [cartMessage]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!formData.city) {
      newErrors.city = 'City is required';
    }if (!formData.address) {
      newErrors.address = 'Address is required';
    }if (!formData.telephone) {
      newErrors.telephone = 'Telephone is required';
    }else if (!/^\d{10}$/.test(formData.telephone)) {
      newErrors.telephone = 'Invalid phone number';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      if( Isalready ){
        axios.post(`http://localhost:5000/update-address/${name}`, formData) // Update with your API endpoint
        .then((response) => {
          setAddupdate(' Address updated successfully ');
        })
        .catch((error) => {
          setAddupdate('Error updating address ');
        });
      }else{
        try {
          const response = await axios.post(`http://localhost:5000/addresses/${name}`, formData);
          setAddupdate(response.data.message);
          SetIsAddressSet(true);
        } catch (error) {
          setAddupdate(response.data.message);
        }
      }
    }
  };


  const placeOrders = () => {
    if (isAddressSet) {
      setLoading(true); // Set loading to true when initiating the order placement
  
      const orderData = {
        name: name,
        price: amount,
      };
      let starValue = 0;
      let bonusValue = 0;
  
      if (amount > 999) {
        // ... (rest of your logic)
      }
  
      axios
        .post('http://localhost:5000/orders', { orderData, foodlist })
        .then(response => {
          console.log('Order placed successfully:', response.data);
          setAddupdate(response.data.message);
          setAmount(0);
          setIsOrder(true);
  
          axios
            .post('http://localhost:5000/clearCart', orderData)
            .then(response1 => {
              console.log('Cart is empty now');
  
              axios
                .post('http://localhost:5000/update-star', {
                  name: name,
                  bonus: bonusValue,
                })
                .then(response2 => {
                  console.log('Star was updated ');
                })
                .catch(error2 => {
                  console.error('Error updating star count !!! ', error2);
                });
            })
            .catch(error1 => {
              console.error('Error clearing cart:', error1);
            })
            .finally(() => {
              setLoading(false); // Set loading to false after completing the order placement process
            });
        })
        .catch(error => {
          console.error('Error placing order:', error);
          setLoading(false); // Set loading to false in case of an error
        });
    } else {
      setCartMessage(' please set address before buy !!! ');
    }
  };

  return (
    <div>
      <ResNav/>
      <div className="buy-main-container pt-14">
        <div className="buy-hero">
          <div className="frm-container">
            <form action="" onSubmit={handleSubmit}>
              <div className="buy-itm-row">
                {/* <label htmlFor="">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder='Input full name'
                />
                {errors.fullName && <span className="pay-error">{errors.fullName}</span>} */}
              </div>
              <div className="buy-itm-row">
                <label htmlFor="">City</label>
                <input 
                  type="text" 
                  placeholder='input your city'
                  name='city'
                  id='city'
                  value={formData.city}
                  onChange={handleInputChange}
                />
                {errors.city && <span className="pay-error">{errors.city}</span>}
              </div>
              <div className="buy-itm-row">
                <label htmlFor="">Address</label>
                <input 
                  type="text" 
                  placeholder='input your address'
                  value={formData.address}
                  onChange={handleInputChange}
                  id='address'
                  name='address'
                />
                {errors.address && <span className="pay-error">{errors.address}</span>}
              </div>
              <div className="buy-itm-row">
                <label htmlFor="">Telephone</label>
                <input 
                  type="text" 
                  placeholder='input mobile number'
                  id='telephone'
                  name='telephone'
                  value={formData.telephone}
                  onChange={handleInputChange}
                />
                {errors.telephone && <span className="pay-error">{errors.telephone}</span>}
              </div>
              <div className="h-8">
              </div>
              <div className="buy-btn-row">
                <button type='submit'>Comfirm</button>
                <button type='reset'>Cansel</button>
              </div>
            </form>
          </div>

          {/* {foodlist.length !== 0 ? (
            foodlist.map(food => (
              <div className="cat-1" key={food}>
                {food.product_name}
                {food.quantity}
              </div>
            ))
          ) : (
            <p>fuck</p>
          )}          */}
          
          <div className="pay-details-con">

            <div className='pay-notice mb-4' >
              <h5>NOTICE !!!</h5>
              <p>We are only deliver within kurunegala district</p>
            </div>
            <hr/>
            {isOrder ? (
              <div className='sent ' >
                <div className='text-center w-4/5'>
                  <p>your order delivered soon</p>
                  <p>View Your dashboard !!</p>
                </div>
              </div>
            ): loading ? (
              <div className="loader-container  w-full flex justify-center items-center gap-12 " style={{ height: '50vh' }} >
                Loading...<div className="loading-spinner"></div>
              </div>
            ):(
              <div className="pay-details">
                <h5>Order Summary</h5>
                <div className="pay-details-row">
                  <h6>Items Total</h6>
                  <p>Rs. {amount}</p>
                </div>
                <div className="pay-details-row">
                  <h6>Delivery Fee</h6>
                  <p>Rs. 300</p>
                </div>
                <div className="pay-details-row">
                  <h6>Total Paayment</h6>
                  <p>Rs. { Number(amount) + 300 }</p>
                </div>
              </div>
            )}
            <div className="pay-btn-con">
              <Link to="/resturant" ><button>Go Back</button></Link> 
              <button onClick={()=>{ placeOrders() }} className={isOrder ? 'hidden' : ''} >PLace Order</button>
            </div>
            
          </div>
          {cartMessage && <p className="cart-message">{cartMessage}</p>}
          {IsNew && <div className='welcome-con'>
            <div className="welcome">
              <p>hii , {name}</p>
              <h6>Welcome to your very first order</h6>
              <h5>Please set the address details first , your next order ou dont need to provide your address , if you want , you can update it .</h5>
              <button onClick={()=>{ SetIsnew(false) }} >OK</button>  
            </div>
          </div>}
          {addupdate && <p className="cart-message">{addupdate}</p>}
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default BuyFoods;