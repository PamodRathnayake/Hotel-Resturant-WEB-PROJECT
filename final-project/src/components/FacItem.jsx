import React from 'react'
import '../components/hotel.css'
import { useNavigate } from 'react-router-dom'

function FacItem(props) {
  const navigate = useNavigate();
  return (
    <div className="hotel-facilities-itm" onClick={()=> navigate(`${props.link}`) }>
        <div className="hotel-facilities-itm-img">
            <img src={`./img/${props.fac}.jpg`} alt="" className='facimg' />
        </div>
        <div className="hotel-facilities-itm-txt">
            <p>{props.dec}</p>
            <h3>{props.tit}</h3>
        </div>
    </div>
  )
}

export default FacItem
