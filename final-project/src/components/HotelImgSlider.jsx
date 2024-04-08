import React, { useEffect, useState } from 'react'
import arrow from '../components/Hotel/img/arrow.png'

function HotelImgSlider() {
    const images = [
        `./img/facdin.jpg`,
        `./img/fachall.jpg`,
        `./img/facdin.jpg`
      ];
    //   {`./img/${props.fac}.jpg`}
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
        <div className="h-image-slider">
            <div className="h-slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                <div key={index} className="h-slide">
                    <img src={image} alt={`Image ${index + 1}`} style={{ width:'100%' }} />
                </div>
                ))}
            </div>
            {/* <button className="h-prev" onClick={prevSlide}><img src={arrow} alt="" style={{ transform: "rotate(180deg)" }} className='arr' /></button>
            <button className="h-next" onClick={nextSlide}><img src={arrow} alt="" className='arr' /></button> */}
        </div>
    </div>
  )
}

export default HotelImgSlider
