import React, { useState } from 'react';
import '../css/admin.css';
import { Link, useNavigate } from 'react-router-dom';

function Anav(props) {
  const name = props.name;
  const options = [`LOGOUT`, `WEB-HOME`];
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const selectedOption = e.target.value;
    setSelected(selectedOption);
    if (selectedOption === 'LOGOUT') {
      navigate('/admin');
    } else if (selectedOption === 'WEB-HOME') {
      navigate('/');
    }
  };

  return (
    <div className="anav-container">
      <div className="admin-dash-con">
        <div className="admin-nav-logo">
          <img src='/rest/logo.png' alt="" />
        </div>
        <div className="admin-nav-txt">
          <select name="" id="" value={selected} onChange={handleChange}>
            <option value="">Hello, {name} </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="dropdown-arrow">&#9660;</div>
        </div>
      </div>
    </div>
  );
}

export default Anav;
