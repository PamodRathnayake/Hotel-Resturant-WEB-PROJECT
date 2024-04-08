import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Hotel/Navbar';
import NavMain from '../components/NavMain';
import Footer from '../components/Footer';
import '../components/css/service.css'
import img1 from '../assets/img/1.png'
import arrow from '../components/Hotel/img/arrow.png'
import park from '../assets/img/park.jpg'
import first from '../assets/img/hall3.jpg'
import dining from '../assets/img/buffet3.jpg'
import view from '../assets/img/view.jpg'
import park1 from '../components/Hotel/img/service/park1.jpg'
import park2 from '../components/Hotel/img/service/park2.jpg'
import park3 from '../components/Hotel/img/service/park3.jpg'
import dining1 from '../components/Hotel/img/service/dining1.jpg'
import dining2 from '../components/Hotel/img/service/dining2.png'
import dining3 from '../components/Hotel/img/service/dining3.jpg'
import view1 from '../components/Hotel/img/service/view1.jpg'
import view2 from '../components/Hotel/img/service/view2.jpg'
import view3 from '../components/Hotel/img/service/view3.jpg'
import first1 from '../components/Hotel/img/service/first1.jpg'
import first2 from '../components/Hotel/img/service/first2.jpg'
import first3 from '../components/Hotel/img/service/first3.jpg'
import Whatsapp from '../components/Whatsapp';

function Service() {  

      const { serviceName } = useParams();
    
      const seclectImg1 = (serviceName) => {
        switch (serviceName) {
          case 'first':
            return first1;
          case 'park':
            return park1;
          case 'dining':
            return dining1;
          case 'view':
            return view1;
          default:
            return img1; // Provide a default image in case of no match
        }
      };
      const seclectImg2 = (serviceName) => {
        switch (serviceName) {
          case 'first':
            return first2;
          case 'park':
            return park2;
          case 'dining':
            return dining2;
          case 'view':
            return view2;
          default:
            return img1; // Provide a default image in case of no match
        }
      };
      const seclectImg3 = (serviceName) => {
        switch (serviceName) {
          case 'first':
            return first3;
          case 'park':
            return park3;
          case 'dining':
            return dining3;
          case 'view':
            return view3;
          default:
            return img1; // Provide a default image in case of no match
        }
      };

    const selectMainIng = (serviceName) => {
        switch (serviceName) {
            case 'first':
              return first;
            case 'park':
              return park;
            case 'dining':
              return dining;
            case 'view':
              return view;
            default:
              return img1; // Provide a default image in case of no match
        }
    }

    const stitdec = ()=>{
      switch (serviceName) {
        case 'first':
          return " We've got the Perfect thing that Suits you";
        case 'park':
          return "Let us worry about your vehicle";
        case 'dining':
          return "Forget finger licking, this is worth even more";
        case 'view':
          return "Enjoy the mountainous views";
        default:
          return ""; // Provide a default image in case of no match
      }
    }
    const stit = ()=>{
      switch (serviceName) {
        case 'first':
          return "what ever the trend is we've got it ";
        case 'park':
          return "Spacious & Comfortable Parking";
        case 'dining':
          return "Lipsmacking good ";
        case 'view':
          return "Eyecatching scenery ";
        default:
          return ""; // Provide a default image in case of no match
      }
    }
    const sp1 = ()=>{
      switch (serviceName) {
        case 'first':
          return "Our hotel comes with three very spacious reception halls namely A,B and C All three of them can easily accomodate 300 guests at a time.";
        case 'park':
          return "We have got three seperate and secured parking lots for each of the reception halls A, B and C.";
        case 'dining':
          return "We offer a wide variety of dishes for the ceromonies held at our venue.";
        case 'view':
          return "Thanks to the significant placement of the hotel you can enjoy paradise like beauty of the sourrounding area.";
        default:
          return " .";
      }
    }
    const sp2 = ()=>{
      switch (serviceName) {
        case 'first':
          return "also you can chose them based on your budget.you can chose the themes the type of decorations you want, the color themes, the arrangement of the setting , the poru  type and so on 	and so forth.";
        case 'park':
          return "All the parking spaces are secured and very spacious, so the customers do not have to worry about finding  a space to park their vehicle or the security of it.";
        case 'dining':
          return "You can find traditional dishes, Indian cuisine influenced dishes and western cuisine influence dishes amoung what we offer for our main dishes.Also we have an arsenal of delicious desserts to complimant the main courses.";
        case 'view':
          return "You can get a borderless, boundless view of the sourrounding area that will fill you with a feeling of awe, when you gaze upon the vally like area below the hotel premises.";
        default:
          return ""; // Provide a default image in case of no match
      }
    }    
    const sp3 = ()=>{
      switch (serviceName) {
        case 'first':
          return "";
        case 'park':
          return "";
        case 'dining':
          return "";
        case 'view':
          return "";
        default:
          return ""; // Provide a default image in case of no match
      }
    }  
      const images = [
        seclectImg1(serviceName),
        seclectImg2(serviceName),
        seclectImg3(serviceName)
      ];
    
    //   // Rest of your component code...
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
          nextSlide();
        }, 3000); // Change image every 3 seconds
        return () => {
          clearInterval(interval);
        };
      }, [currentIndex]);

    return (
      <div>
        <NavMain/>
        <Navbar/>
        <Whatsapp/>
        <div className="service-container mt-12">
            <div className="service-header-txt">
                <p>{stitdec()}</p>
                <h1>{stit()}</h1>
            </div>
            <div className="service-hero">
                <div className="service-hero-img">
                    <img src={selectMainIng(serviceName)} alt="" />
                </div>
                <div className="service-hero-txt">
                    <div className="service-hero-txt-p">
                        <p>{sp1()}</p>
                        <p>{sp2()}</p>
                        <p>{sp3()}</p>
                    </div>
                </div>
            </div>
            <div className="service-txt">
                <p>DISCOVER OUR WORLD, BROWSE THROUGH THE GALLERY</p>
                <h2> <span className='service-txt-light'> A VIRTUAL TOUR OF </span>OUR LIFESTYLE HOTEL</h2>
            </div>

            <div className="image-slider">
            <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                <div key={index} className="slide">
                    <img src={image} alt={`Image ${index + 1}`} style={{ width:'100%' }} />
                </div>
                ))}
            </div>
            <button className="prev" onClick={prevSlide}><img src={arrow} alt="" style={{ transform: "rotate(180deg)" }} className='arr' /></button>
            <button className="next" onClick={nextSlide}><img src={arrow} alt="" className='arr' /></button>
            </div>

        </div>
        <div style={{ height: "10vh" }}>
        </div>
        <Footer/>
      </div>
  )
}

export default Service