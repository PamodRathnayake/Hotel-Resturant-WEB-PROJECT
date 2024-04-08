import React,{ useState } from 'react'
import NavMain from '../components/NavMain'
import '../components/firstView.css'
import SignUp from './SignUp.jsx'
import { UserContext, UserProvider } from '../components/UserContext'
import { Link } from 'react-router-dom'
import Whatsapp from '../components/Whatsapp'


function FirstView() {


  return (

      <div className='mainC'>
        <NavMain/>
        <Whatsapp/>
        <div className='main-container'>
          <h1>WELCOME TO PEELLAKANDA</h1>
          <div className='col1 hotel'>
            <div className="txt-container">
              <div className="title">
                PEELLAKANDA RECEPTION HALL
              </div>
              <div className="btns transition hover:scale-105">
                <Link to="/hotel" className=''>View More</Link>
              </div>
            </div>
          </div>
          <div className="col1 resturant">
            <div className="txt-container">
              <div className="title">
                PEELLAKANDA BOJUNHALA
              </div>
              <div className="btns transition hover:scale-105">
                <Link to="/resturant" className=''>View More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

  )
}

export default FirstView
