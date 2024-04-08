import React from 'react'
import '../components/footer.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import visa from '../assets/img/Payment.png'

function Footer() {
  return (
    <div className='footer-container'>
      <div className="footer-row-1">
            <div className="footer-contact">
                <h3>CONTACT US</h3>
                <p>Feel free to contact us.</p>
                <p>+(94)37 2249599</p>
                <p>+(94)37 7200343</p>
                <p>info@peellakanda.com</p>
                <p>Pellakanda Reception Hall,Kiwulegedara,Narammala.</p>
            </div>
            <div className="footer-social">
                <h4>Like Our Facebook pages for more Updates</h4>
                <p className='cursor-pointer'> <FontAwesomeIcon icon={faFacebook} size="lg" className='text-blue-700 pr-2' />
                    Peellakanda Reception Halls</p>
                <p className='cursor-pointer'><FontAwesomeIcon icon={faFacebook} size="lg" className='text-blue-700 pr-2' />
                    Peellakanda Bojunhala</p>
            </div>
            <div className="footer-payments">
                <h4>Payment Methods</h4>
                <p>Payment methods we accept</p>
                <img src={visa} alt="" className='h-9 py-2' />
            </div>
      </div>
      <div className="footer-row-2">
            <div className="footer-privacy">
                <Link to='/'>Privacy Policy | Terms & Conditions</Link>
            </div>
            <div className="footer-copyright">
                <Link to='/'>Copyright 2023 Team Alpha.All Rights Reserved.</Link>
            </div>
            <div>

            </div>
      </div>
    </div>
  )
}

export default Footer
