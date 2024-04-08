import React, { useEffect, useState } from 'react'
import NavMain from '../components/NavMain'
import Navbar from '../components/Hotel/Navbar'
import Footer from '../components/Footer'
import '../components/css/gallery.css'

function Gallery() {

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/gallery')
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  return (
    <div>
      <NavMain/>
      <Navbar/>
      <div className='gal-main-container mt-12'>
        <p>DISCOVER OUR WORLD, BROWSE THROUGH THE GALLERY</p>
        <h2><span>A VIRTUAL TOUR OF</span> LIFESTYLE HOTEL</h2>
        {images.length > 0 ? (
            <div className="gallery">
              {images.map(image => (
                  <div key={image.id} className="gallery-item">
                      {image.description === "hall A" ? (
                          <img src={`/New folder/Hall A/${image.filename}`} alt={image.title} />
                      ) : image.description === "hall B" ? (
                        <img src={`/New folder/Hall B/${image.filename}`} alt={image.title} />
                      ) : image.description === "hall C" ? (
                        <img src={`/New folder/Hall C/${image.filename}`} alt={image.title} />
                      ) : null }
                  </div>
              ))}
            </div>
        
        ) : (
            <div>No images available.</div>
        )}
      </div>
      <Footer/>
    </div>
  )
}

export default Gallery
