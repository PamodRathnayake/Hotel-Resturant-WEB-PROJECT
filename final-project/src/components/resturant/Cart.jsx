import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../css/resnav.css'
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

function Cart({ isOpen, onClose }) {

  const { setUsername } = useContext(UserContext);
  const { username } = useContext(UserContext);
  if (!isOpen) return null;
  const [cartItems, setCartItems] = useState([]);
  const totBill = 0 ;

  // const [isBuyOpen, setIsBuyOpen] = useState(false);
  // const openBuy = () => {
  //   setIsBuyOpen(true);
  // };
  // const closeBuy = () => {
  //   setIsBuyOpen(false);
  // };

  useEffect(() => {

    axios.get(`http://localhost:5000/cart/${username}`)
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });

  }, []);

  const handleRemoveItem = (product_name) => {
    axios.delete(`http://localhost:5000/cart/${username}/${product_name}`)
      .then(() => {
        const updatedCartItems = cartItems.filter(item => item.product_name !== product_name);
        setCartItems(updatedCartItems);
      })
      .catch(error => {
        console.error('Error removing cart item:', error);
      });
  };

  const handleQuantityChange = async (product_name, newQuantity) => {
    newQuantity = parseInt(newQuantity);
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    const updatedCartItems = cartItems.map(item => {
      if (item.product_name === product_name) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    try {
      const response = await axios.post('http://localhost:5000/update-cart', {
        productId: product_name,
        quentity: newQuantity,
        userId: username ,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
      console.log('Error adding item to cart');
    }
  };  
  
  const handlePay = () => {
    
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content relative">
        <button className="modal-close" onClick={onClose} >
          X
        </button>
        {cartItems.length === 0 ? (
          <div className='res-no-items'>
            <h3>
              Add items to start a cart
            </h3>
            <p>
              Once you add items from a restaurant or store, your cart will appear here.
            </p>
            <button onClick={onClose} >Start Shopping</button>
          </div>
        ) : (

          <div className="res-items">

            <h1>Your Cart</h1>
          
            <div className="res-itms-con">
          
              {cartItems.map(item => (
                <div className="res-itm-row" key={item.id}>
                  {/* {totBill = totBill + (item.quantity)*(item.price)} */}
                  <p>{item.product_name}</p>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.product_name, e.target.value)}
                  />
                  <p>Rs: {(item.quantity)*(item.price)}</p>
                  <button onClick={() => handleRemoveItem(item.product_name)} >X</button>
                </div>
              ))}     
          
            </div>
          
            <div className="cat-tot-price">
              Rs: {cartItems.reduce((total, item) => total + item.quantity * item.price, 0)}
            </div>

            <div className="cart-btn-row ">
            <Link
                to={`/BuyFoods/${encodeURIComponent(username)}/${encodeURIComponent(
                  cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
                )}`}>
                <button className='bg-orange-200'>PAY NOW</button>
              </Link>
              <button className='bg-red-200' onClick={onClose}>CLOSE</button>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default Cart
