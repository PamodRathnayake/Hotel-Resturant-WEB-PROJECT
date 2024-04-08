import React from 'react'
import '../halls.css'
import imgHall1 from './img/hall1.jpg'
import { Link } from 'react-router-dom'

function Service_hall_card(props) {

  

  return (
      <div>
        <div className="halls_hall_container">

          {props.angle === "left" ? (
            // If angle is "left"
            <>
              <div className="halls_hall_img">
                <img src={props.imgSrc} alt="" />
              </div>
              <div className="halls_hall_text">
                <h3>{props.title}</h3>
                <p>{props.des}</p>
                <Link to={`/${props.to}/${props.id}`} className='halls_hall_link'>{props.link}</Link>
              </div>
            </>
          ) : (
            // If angle is not "left" 
            <>
              <div className="halls_hall_text">
                <h3>{props.title}</h3>
                <p>{props.des}</p>
                <Link to={`/${props.to}/${props.id}`} className='halls_hall_link'>{props.link}</Link>
              </div>
              <div className="halls_hall_img">
                <img src={props.imgSrc} alt="" />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
  

export default Service_hall_card
