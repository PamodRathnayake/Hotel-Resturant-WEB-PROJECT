import React, { useState } from 'react'
import NavMain from '../components/NavMain'
import Navbar from '../components/Hotel/Navbar'
import '../components/halls.css'
import Footer from '../components/Footer'
import imgHall1 from '../assets/img/hall1.jpg'
import imgHall2 from '../assets/img/hall2.jpg'
import imgHall3 from '../assets/img/hall3.jpg'
import { Link } from 'react-router-dom'
import Service_hall_card from '../components/Hotel/Service_hall_card'
import axios from 'axios'
import Whatsapp from '../components/Whatsapp'

function Halls() {

  const [send , setSend ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [already,setAlready] = useState(false) ;
  const [err,setErr] = useState(false);
  const [formData, setFormData] = useState({
    banquetHall: '',
    date: '',
    title: '',
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.banquetHall) {
      newErrors.banquetHall = 'Please select a banquet hall';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.title) {
      newErrors.title = 'Please select a title';
    }

    if (!formData.fullName) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!formData.email) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      
      try{
        setLoading(true);
        const response = await axios.post('http://localhost:5000/inquereHall', formData ,{
          headers:{
            'Content-Type': 'application/json',
          }
        });
        console.log(response.data);                                                           
          if (response.data.hasOwnProperty('success') && response.data.success) {
            setSend(true);
            console.log('Form data submitted successfully:', response.data.message);
            setFormData({
              banquetHall: '',
              date: '',
              title: '',
              fullName: '',
              email: '',
              phone: '',
              message: ''
            });
          } else if ( response.data.hasOwnProperty('already') && response.data.already ){
            setAlready(true);
            setFormData({
              banquetHall: '',
              date: '',
              title: '',
              fullName: '',
              email: '',
              phone: '',
              message: ''
            });
            console.log('in this day already booked: ...', response.data.message);
          } else {
            console.error('Error submitting form:', error);
            setErr(true);
          }
          console.log('Response:', response.data);
          setAlready(false);
          setErr(false);
        // })
        // .catch(error => {
        //   console.error('Error:', error);
        // });
      }catch(err){
        // alert("error submitting form " + err.message);
        setAlready(true);
        setFormData({
          banquetHall: '',
          date: ''
        });
        console.log('in this day already booked: ...', response.data.message);
      }finally{
        setLoading(false);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const getFormattedToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = getFormattedToday();

  return (
    <div>
        <NavMain/>
        <Navbar/>
        <Whatsapp/>
        <div className="halls_main_container">
              <h1>For Weddings, Special Occasions, Baj parties Business Meetings or Intimate gatherings</h1>
              <p>Turn your ordinary functions sensational, partnering with the record setting, lofty and lavish 35ft tall pillar-less, fully opened grand ballroom hall.</p>
        </div>
        <h2 className='halls_h2'>The Peellakanda is now open for weddings, fashion shows, corporate events, exhibitions and more</h2>
        
        
        <div className="halls_halls_container">

          <Service_hall_card 
            id="A"
            to="hall"
            title="Hall A" 
            des="The large, Non A/C hall can accommodate 300 people with seating arrangements. This hall can be arranged as per your requirement.You can decorate your most precious day beautifully by choosing this hall."
            angle="left"
            link="View More About Hall A"
            imgSrc={imgHall1}
          />

          <Service_hall_card 
            id="B"
            to="hall"
            title="Hall B" 
            des="The largest air-conditioned banquet hall available in our institution. Decorate this hall for your wedding day with a seating capacity of 400 people."
            angle="right"
            imgSrc={imgHall2}
            link="View More About Hall B"
          />

          <Service_hall_card 
            id="C"
            to="hall"
            title="Hall C" 
            des="This air-conditioned hall can be reserved for your special day as per your wish. This hall has the capacity to seat more than 300 people. Choose Hall C to decorate your precious day beautifully."
            angle="left"
            imgSrc={imgHall3}
            link="View More About Hall c"
          />
        
        </div>

        <div className="hall-inquire" id="hall-inquire">
          <div className="inquire-frm-container">
            {loading ? (
              <div className="loader-container  w-full flex justify-center items-center gap-12 " style={{ height: '50vh' }} >
                Loading...<div className="loading-spinner"></div>
              </div>
            ) : send ? (
              <div className='text-2xl text-orange-500 text-center'>
                your inquery was send successfully<br/>Check Your Inbox , We Sent Email
              </div>
            ) : err ? (
              <div>
                Something went wrong !!! Please try again
              </div>
            ) : already ? (
                <>
                  <h3 className='text-red-500 font-bold'>its already booked find another day</h3>
                  <h2>INQUIRE NOW</h2>
                  <form action="" className='inquire-frm' onSubmit={handleSubmit}>

                    <div className="inquire-row">
                      <div className="inquire-row-inp w70">
                        <label>BANQUET Hall</label>
                        <select name="banquetHall" value={formData.banquetHall} onChange={handleInputChange}>
                          <option value="">Please Select</option>
                          <option value="A">Hall A</option>
                          <option value="B">Hall B</option>
                          <option value="C">Hall C</option>
                        </select>
                        {errors.banquetHall && <div className='error'>{errors.banquetHall}</div>}
                      </div>
                      <div className="inquire-row-inp">
                        <label>Date</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          min={today}
                          onChange={handleInputChange}
                        />
                        {errors.date && <div className='error'>{errors.date}</div>}
                      </div>                
                    </div>

                    <div className="inquire-row">
                      <div className="inquire-row-inp w30">
                        <label>TITLE</label>
                        <select name="title" value={formData.title} onChange={handleInputChange}>
                          <option value="">Please Select</option>
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Miss">Miss</option>
                        </select>
                        {errors.title && <div className='error'>{errors.title}</div>}
                      </div>
                      <div className="inquire-row-inp">
                        <label>FULL NAME</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                        {errors.fullName && <div className='error'>{errors.fullName}</div>}
                      </div>                
                    </div>

                    <div className="inquire-row">
                      <div className="inquire-row-inp">
                        <label>EMAIL</label>
                        <input type="text" name='email' value={formData.email} onChange={handleInputChange} />
                        {errors.email && <div className='error'>{errors.email}</div>}
                      </div>
                      <div className="inquire-row-inp">
                        <label>PHONE</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                        {errors.phone && <div className='error'>{errors.phone}</div>}
                      </div>                
                    </div>

                    <div className="inquire-row">
                      <div className="inquire-row-inp">
                        <label>MESSAGE</label>
                        <textarea name="message" cols="30" rows="10" value={formData.message} onChange={handleInputChange}></textarea>
                        {errors.message && <div className='error'>{errors.message}</div>}
                      </div>              
                    </div>
                    
                    <div className="inquire-btn-container">
                      <button className='inquire-submit' type='submit'>SUBMIT</button>
                    </div>

                  </form>
                </>
            ) : (
              <>
                <h2>INQUIRE NOW</h2>
                <form action="" className='inquire-frm' onSubmit={handleSubmit}>

                  <div className="inquire-row">
                    <div className="inquire-row-inp w70">
                      <label>BANQUET Hall</label>
                      <select name="banquetHall" value={formData.banquetHall} onChange={handleInputChange}>
                        <option value="">Please Select</option>
                        <option value="A">Hall A</option>
                        <option value="B">Hall B</option>
                        <option value="C">Hall C</option>
                      </select>
                      {errors.banquetHall && <div className='error'>{errors.banquetHall}</div>}
                    </div>
                    <div className="inquire-row-inp">
                      <label>Date</label>
                      <input
                          type="date"
                          name="date"
                          value={formData.date}
                          min={today}
                          onChange={handleInputChange}
                        />
                      {errors.date && <div className='error'>{errors.date}</div>}
                    </div>                
                  </div>

                  <div className="inquire-row">
                    <div className="inquire-row-inp w30">
                      <label>TITLE</label>
                      <select name="title" value={formData.title} onChange={handleInputChange}>
                        <option value="">Please Select</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                      </select>
                      {errors.title && <div className='error'>{errors.title}</div>}
                    </div>
                    <div className="inquire-row-inp">
                      <label>FULL NAME</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                      {errors.fullName && <div className='error'>{errors.fullName}</div>}
                    </div>                
                  </div>

                  <div className="inquire-row">
                    <div className="inquire-row-inp">
                      <label>EMAIL</label>
                      <input type="text" name='email' value={formData.email} onChange={handleInputChange} />
                      {errors.email && <div className='error'>{errors.email}</div>}
                    </div>
                    <div className="inquire-row-inp">
                      <label>PHONE</label>
                      <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                      {errors.phone && <div className='error'>{errors.phone}</div>}
                    </div>                
                  </div>

                  <div className="inquire-row">
                    <div className="inquire-row-inp">
                      <label>MESSAGE</label>
                      <textarea name="message" cols="30" rows="10" value={formData.message} onChange={handleInputChange}></textarea>
                      {errors.message && <div className='error'>{errors.message}</div>}
                    </div>              
                  </div>
                  
                  <div className="inquire-btn-container">
                    <button className='inquire-submit' type='submit'>SUBMIT</button>
                  </div>

                </form>
              </>
            )}
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Halls
