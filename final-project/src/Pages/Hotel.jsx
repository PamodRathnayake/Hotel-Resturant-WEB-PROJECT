import React from 'react'
import NavMain from '../components/NavMain'
import Navbar from '../components/Hotel/Navbar'
import Footer from '../components/Footer'
import '../components/hotel.css'
import Map from '../components/Hotel/Map'
import imgAbout from '../assets/img/8.png'
import Cards from '../components/Hotel/Cards'
// import ScrollReveal from 'scrollreveal';
// import ScrollReveal from "scrollreveal";
import { animateScroll as scroll } from "react-scroll/modules";
import FacItem from '../components/FacItem'
import HotelImgSlider from '../components/HotelImgSlider'
import Whatsapp from '../components/Whatsapp'

function Hotel() {

  // ScrollReveal({ 
  //   reset: true,
  //   distance:'60px',
  //   duration:2500,
  //   delay:400
  // });
  // ScrollReveal().reveal('.hotel_main_container',{delay:500 , origin : 'left'});
  return (
    <div>
        <NavMain/>

        <Navbar/>

        <Whatsapp/>

        <div className="hotel_main_container" id='hotel_main_container'>
          <h2>WELCOME TO</h2>
          <h1>The Peellakanda</h1>
          <h3>Ultimate luxury at it’s best</h3>
        </div>

        <div className='hotel_about'>

          <div className="hotel_about_txt">
            <h2>Welcome  To</h2>
            <h3>Peellakanda Reception Hall</h3>
            <div className="hotel_about_txt_p">
              <p>
              Welcome to Peellakanda Reception Hall. We are one of the prime hotels 
              in Narammala which has the most scenic environment with beautiful backdrop 
              of mountainous sites.
              </p>
              <p>
              We offer the flexibility to accommodate a variety of selections for Weddings 
              with our three Reception Halls. The experienced staff at Peellakanda 
              will help you mold the compilation of dreams, visuals, and concepts into reality 
              of your special day.
              </p>
              <p>
              And we also provide facility for Special life events, Annual celebrations, 
              Seminars and workshops with the 
              service excellence of 10 years.
              </p>
            </div>
          </div>
          <div className="hotel_about_img">
            <img src={imgAbout} alt="" />
          </div>
        </div>

        <div className="hotel_cards">
          <div className="hotel_cards_track">

            <div className="hotel_cards_track_card">
              <Cards title="SCENIC ENVIRONMENT" des="Fell the relaxation with scenic environment with beautiful backdrop of mountainous sites."/>
            </div>
            <div className="hotel_cards_track_card">
              <Cards title="BANQUET HALLS" des="We offer three Banquet Halls for you.Select the best fit one to mold your compiliation of dreams"/>
            </div>
            <div className="hotel_cards_track_card">
              <Cards title="PEELLAKANDA BOJUNHALA" des="Fell the great taste of delicious foods from our chefs."/>
            </div>
            <div className="hotel_cards_track_card">
              <Cards title="PEELLAKANDA LITTLEHUT" des="Convert your Special Life events in to unforgettable memories Celebrate it in Peellakanda Little Hut."/>
            </div>
            <div className="hotel_cards_track_card">
              <Cards title="EXCELLENCE SERVICE" des="With the service excellence of 15 years our well trained staff will ofer you all facilities."/>
            </div>
            <div className="hotel_cards_track_card">
              <Cards title="SCENIC ENVIRONMENT" des="Fell the relaxation with scenic environment with beautiful backdrop of mountainous sites."/>
            </div>
            <div className="hotel_cards_track_card">
              <Cards title="BANQUET HALLS" des="We offer three Banquet Halls for you.Select the best fit one to mold your compiliation of dreams"/>
            </div>
            <div className="hotel_cards_track_card">
              <Cards title="PEELLAKANDA BOJUNHALA" des="Fell the great taste of delicious foods from our chefs."/>
            </div>
            <div className="hotel_cards_track_card">
              <Cards title="PEELLAKANDA LITTLEHUT" des="Convert your Special Life events in to unforgettable memories Celebrate it in Peellakanda Little Hut."/>
            </div>


          </div>
        </div>

        <div className="hotel-facilities-container">
          <p>CURATED TO SUIT YOUR LIFESTYLE</p>
          <h2>OUR FACILITIES</h2>
          <div className="hotel-facilities">
            <div className="hotel-facilities-row">
              <FacItem
                dec="THE PERFECT SPACE FOR PRIVATE EVENTS,CONFERENCE AND MORE"
                tit="BANQUET HALL"
                fac="fachall"
                link="/halls"
              />
              <FacItem
                dec="ENJOY LOCAL AND INTERNATIONAL CUISINES"
                tit="ALL DAY DINING"
                fac="facdin"
                link="/service/dining"
              />
            </div>
            <div className="hotel-facilities-row">
              <FacItem
                dec="THE PERFECT SPACE FOR PRIVATE EVENTS,CONFERENCE AND MORE"
                tit="BANQUET HALL"
                fac="facpark"
                link="/service/park"
              />
              <FacItem
                dec="THE PERFECT SPACE FOR PRIVATE EVENTS,CONFERENCE AND MORE"
                tit="BANQUET HALL"
                fac="pacview"
                link="/service/view"
              />
            </div>
          </div>
        </div>

        <div className="hotel-slider-container">
          <p>DISCOVER OUR WORLD, BROWSE THROUGH THE GALLERY</p>
          <h2> <span>A VIRTUAL TOUR OF</span> LIFESTYLE HOTEL</h2>
          <HotelImgSlider/>
        </div>

        <div className="hotel-location">
          <p>IN THE HEART OF THE CITY</p>
          <h2><span>OUR</span> LOCATION</h2>
        </div>

        <Map/>

        <div className="hotel-foot">
          <h3>Check-in / Check-out</h3>
          <p>We hope you've enjoyed your stay from start to finish.Please note the check-in / out times below.</p>
          <div className="hotel-check-in-out">
            <p>Check-In : 12pm</p>
            <p>Check-out : 12noon</p>
          </div>
        </div>

        <Footer/>

    </div>
  )
}

export default Hotel