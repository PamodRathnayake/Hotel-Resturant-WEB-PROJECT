import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();
  const [isDropVhalls, setDropVhalls] = useState(false);
  const [isDropServices, setDropServices] = useState(false);
  const handleHoverVhalls = () => {
    setDropVhalls(!isDropVhalls);
  };
  const handleHoverServices = () => {
    setDropServices(!isDropServices);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='navbar'>
        <div className="navbar-icon" onClick={toggleMenu}>
          <img src={`./img/${isMenuOpen ? 'Close.png' : 'menu.png'}`} alt="" style={{width:"30px"}}/>
        </div>
        <ul className={`navbar-menu ${isMenuOpen ? 'show-menu' : ''}`}>
            <li><Link to="/hotel">HOME</Link></li>
            <li>
              <div className="dropdown-container" onMouseEnter={handleHoverVhalls} onMouseLeave={handleHoverVhalls}>
                <div className="dropdown-trigger" onClick={() => navigate('/halls')} >BANQUET HALLS</div>
                {isDropVhalls && (
                  <div className="dropdown-content">
                    <Link to="/hall/A">
                      <p>Hall A</p>
                    </Link>
                    <Link to="/hall/B">
                      <p>Hall B</p>
                    </Link>
                    <Link to="/hall/C">
                      <p>Hall C</p>
                    </Link>
                    <Link to="/halls#hall-inquire">
                      <p>Inquere Hall</p>
                    </Link>
                  </div>
                )}
              </div>
            </li>
            <li>
              <div className="dropdown-container" onMouseEnter={handleHoverServices} onMouseLeave={handleHoverServices}>
                <div className="dropdown-trigger" onClick={() => navigate('/services')} >OUR SERVICES</div>
                {isDropServices && (
                  <div className="dropdown-content">
                    <Link to="/service/park">
                      <p>Parking</p>
                    </Link>
                    <Link to="/service/dining">
                      <p>Dining</p>
                    </Link>
                    <Link to="/service/view">
                      <p>View</p>
                    </Link>
                    <Link to="/service/first">
                      <p>Your Plan</p>
                    </Link>
                  </div>
                )}
              </div>
            </li>
            <li><Link to="/contact">CONTACT US</Link></li>
            <li><Link to="/gallery">GALLERY</Link></li>
        </ul>
    </div>
  )
}

export default Navbar