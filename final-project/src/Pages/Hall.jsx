import React, { useState } from 'react'
import NavMain from '../components/NavMain'
import Navbar from '../components/Hotel/Navbar'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import '../components/css/hall.css'

import hallA01 from '../components/Hotel/img/hallA01.jpg'
import hallA02 from '../components/Hotel/img/hallA02.jpg'
import hallB01 from '../components/Hotel/img/hallB01.jpg'
import hallB02 from '../components/Hotel/img/hallB02.jpg'
import hallC01 from '../components/Hotel/img/hallC01.jpg'
import hallC02 from '../components/Hotel/img/hallC02.jpg'
import imga1 from '../assets/img/Hall-A/1.png'
import imga2 from '../assets/img/Hall-A/2.png'
import imga3 from '../assets/img/Hall-A/3.png'
import imga4 from '../assets/img/Hall-A/4.png'
import imga5 from '../assets/img/Hall-A/5.png'
import imga6 from '../assets/img/Hall-A/6.png'
import imgb1 from '../assets/img/Hall-B/1.png'
import imgb2 from '../assets/img/Hall-B/2.png'
import imgb3 from '../assets/img/Hall-B/3.png'
import imgb4 from '../assets/img/Hall-B/4.png'
import imgb5 from '../assets/img/Hall-B/5.png'
import imgb6 from '../assets/img/Hall-B/6.png'
import imgc1 from '../assets/img/Hall-C/1.png'
import imgc2 from '../assets/img/Hall-C/2.png'
import imgc3 from '../assets/img/Hall-C/3.png'
import imgc4 from '../assets/img/Hall-C/4.png'
import imgc5 from '../assets/img/Hall-C/5.png'
import imgc6 from '../assets/img/Hall-C/6.png'

import axios from 'axios'
import { useEffect } from 'react'
import Whatsapp from '../components/Whatsapp'

function Hall(props) {
  
    const navigate = useNavigate();

    const [backgroundImage, setBackgroundImage] = useState(hallA01);
    const [backgroundImage1, setBackgroundImage1] = useState(hallA02);
    const [data, setData] = useState([]);
    const { hallId } = useParams();

    const getBackgroundImage = (hallId) => {
      switch (hallId) {
        case 'A':
          return hallA01;
        case 'B':
          return hallB01;
        case 'C':
          return hallC01;
      }
    };
    const getBackgroundImage1 = (hallId) => {
      switch (hallId) {
        case 'A':
          return hallA02;
        case 'B':
          return hallB02;
        case 'C':
          return hallC02;
      }
    };

    useEffect(() => {
      fetchData();
    }, [hallId]);
  
    useEffect(() => {
      setBackgroundImage(getBackgroundImage(hallId));
    }, [hallId]);

    useEffect(() => {
      setBackgroundImage1(getBackgroundImage1(hallId));
    }, [hallId]);

    const fetchData = async () => {
      if (hallId.trim() !== '') {
        axios
          .post(`http://localhost:5000/halldata?id=${hallId}`)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
            setUser(null);
          });
      }
    };
  
  return (
    <div>
      <NavMain/>
      <div className="hall-nav">
        <Navbar/>
      </div>        
      <div className="hall-main-container">
      <Whatsapp/>
        {data ? (
          <>
            <div className="hall-head">
              <h2>WEDDINGS, CONFERENCES AND MORE</h2>
              <h1>THE HALL {hallId}</h1>
              <p>{data.des1}</p>
            </div>
            <div className="hall-about">
              <div className="hall-about-txt">
                <div className="hall-about-txt-one">
                  {data.des2}
                </div>
                <div className="hall-about-txt-two">
                  <h3>LOCATION</h3>
                  <p>{data.location}</p>
                </div>
                <div className="hall-about-txt-two">
                  <h3>AREA</h3>
                  <p>{data.area}</p>
                </div>
              </div>
              <div className="hall-about-img">
                <div className="hall-about-img-1" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                <div className="hall-about-img-1"  style={{ backgroundImage: `url(${backgroundImage1})` }}></div>
              </div>
            </div>
            {hallId === "A" ? (
              <div className="hall-images">
                <img src={imga1} alt="" />
                <img src={imga2} alt="" />
                <img src={imga3} alt="" />
                <img src={imga4} alt="" />
                <img src={imga5} alt="" />
                <img src={imga6} alt="" />
              </div>
            ) : hallId === "B" ? (
              <div className="hall-images">
                <img src={imgb1} alt="" />
                <img src={imgb2} alt="" />
                <img src={imgb3} alt="" />
                <img src={imgb4} alt="" />
                <img src={imgb5} alt="" />
                <img src={imgb6} alt="" />
              </div>
            ) : hallId === "C" ? (
              <div className="hall-images">
                <img src={imgc1} alt="" />
                <img src={imgc2} alt="" />
                <img src={imgc3} alt="" />
                <img src={imgc4} alt="" />
                <img src={imgc5} alt="" />
                <img src={imgc6} alt="" />
              </div>
            ) : null}
          </>
        ):(
          <div className='flex justify-center items-center w-full h-screen text-4xl text-red-500 '>
            <p>UNEXPECTED ERROR , Go Back and try again</p>
          </div>
        )}
          
       
        <div className="hall-before-footer">
          <p>For those who don’t know where to begin, our team of experts are here to light an imaginative spark to make sure your dream wedding is nothing short of perfect</p>
        </div>

        <div className="hall-links">
          <div className="hall-lnk"><button onClick={()=> navigate('/halls#hall-inquire') }>INQUIRE NOW</button></div>
          <div className="hall-lnk"><button onClick={()=> navigate('/contact#contact-details') }>OUR CONTACT DETAILS</button></div>
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default Hall
