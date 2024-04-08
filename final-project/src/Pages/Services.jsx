import React from 'react'
import NavMain from '../components/NavMain'
import Navbar from '../components/Hotel/Navbar'
import '../components/Services.css'
import Footer from '../components/Footer'
import buffect from '../assets/img/buffet.jpg'
import park from '../assets/img/park.jpg'
import view from '../assets/img/view.jpg'
import hall6 from '../assets/img/hall6.jpg'
import Service_hall_card from '../components/Hotel/Service_hall_card'
import Fade from 'react-reveal/Fade';
import Whatsapp from '../components/Whatsapp'

function Services() {
  return (
    <div>
        <NavMain/>
        <Navbar/>
        <Whatsapp/>
        <div className="services_main_container">
            <h2>EXPLORE THE PEELLAKANDA</h2>
            <h1>FACILITIES</h1>
            <p>This Colombo Five-star hotel offers a range of facilities and recreational activities to help business travelers as well as families and couples on holiday to rejuvenate and unwind. This includes a fully-fledged fitness centre, The Kingsbury’s “Senses” Spa, an expansive pool facing the Indian Ocean and a host of other services and amenities to suit your business needs.</p>
        </div>

        <div className="halls_halls_container py-10 flex flex-col gap-4">

          <Service_hall_card 
            to="service" 
            id="first"
            title="Have It Big, Have it small, It’s Your Call" 
            des="The large, luxurious pillar-less styled ballroom hall can accommodate 2000 people with seating arrangements or 5000 people without seating arrangements. This fitting ballroom hall also can be separated into 2 to 4 Ballroom venues as per your requirement."
            angle="right"
            link="View More..."
            imgSrc={hall6}
          />

          <Service_hall_card 
            to="service"
            id="dining"
            title="Delicious Dining" 
            des="The Epitome is a place where you can dine on mouthwatering traditional Sri Lankan and international cuisines under the same roof with the promise of delivering the best quality of food in the island. Experience the high quality foods with our well-experienced chef, great in making delicious foods with his battalion."
            angle="left"
            link="View More About Delicious Dining"
            imgSrc={buffect}
          />

          <Service_hall_card 
            to="service"
            id="park"
            title="Large Valet Parking" 
            des="The large parking & wedding valet service can cater a great capacity."
            angle="right"
            imgSrc={park}
            link="View More About Large Valet Parking"
          />
          <Fade >
            <Service_hall_card 
              title="Breathtaking View"
              to="service"
              id="view" 
              des="It is situated at a vantage point, where it commands a panoramic view of the hill country and the surrounding cities."
              angle="left"
              imgSrc={view}
              link="View More About Breathtaking View"
            />
          </Fade>

        
        </div>
        <Footer/>
    </div>
  )
}

export default Services
