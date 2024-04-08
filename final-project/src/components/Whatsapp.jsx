import React from 'react';
import '../components/css/whatsapp.css'
const Whatsapp = () => {
  const phoneNumber = '0761522239'; // phone number
  const message = 'Hello! I need to know more about your hotel.'; // predefined message
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="whatsapp-chat">
      
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">        
        
        <img 
          src={"./img/whatsapp-icon.png"} 
          alt="WhatsApp Chat" 
          className="whatsapp-icon" 
        />

      </a>

    </div>
  );
};

export default Whatsapp;
