import React, { useState } from 'react'
import NavMain from '../components/NavMain'
import Navbar from '../components/Hotel/Navbar'
import '../components/contactus.css'
import Footer from '../components/Footer'
import handleInputChange from '../components/formUtils'
import axios from 'axios'
import Whatsapp from '../components/Whatsapp'

function Contact() {

    const [errors, setErrors] = useState({});
    const [send , setSend ] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
      title: 'Mr',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      city: '',
      subject: '',
      message: ''
    });

    const [isChecked, setIsChecked] = useState(false);

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleCheck = () => {
      setIsChecked((prevChecked) => !prevChecked);
    };



    const handleChange = (event) => {
      handleInputChange(event, formData, setFormData, errors, setErrors);
    };
  





    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsFormSubmitted(true);
      
      const newErrors = {} ;

      if (formData.firstName.trim() === '') {
        newErrors.firstName = 'First name is required';
      }
      if (formData.lastName.trim() === '') {
        newErrors.lastName = 'Last name is required';
      }
      if (formData.phone.trim() === '') {
        newErrors.phone = 'Phone number is required';
      }
      if (formData.email.trim() === '') {
        newErrors.email = 'Email is required';
      }
      if (formData.city.trim() === '') {
        newErrors.city = 'City is required';
      }
      if (formData.message.trim() === '') {
        newErrors.message = 'Message is required';
      }
      if (formData.subject.trim() === '') {
        newErrors.subject = 'Subject is required';
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        ...newErrors,
      }));


      if (isChecked) {
        if (Object.keys(newErrors).length === 0  && !errors.phone && !errors.email) {
          try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/contact', formData);
            console.log(response.data);
            if (response.data.hasOwnProperty('success') && response.data.success) {
              setSend(true);
              console.log('Form data submitted successfully:', response.data.message);
              setFormData({
                title: 'Mr',
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                city: '',
                subject: '',
                message: '',
              });
            } else {
              console.log('Error: ...', response.data.error);
            }
          } catch (error) {
            alert('Error submitting form:', error.message);
          } finally {
            setLoading(false);
          }
        }
        else {
          console.log('Form has errors. Cannot submit.');
        }
      } else {
        console.log('Please accept the agreement before submitting.');
      }
      console.log(formData);
    };



  return (
    <div>
        <NavMain/>
        <Whatsapp/>
        <Navbar/>
        <div className="contactus_container">
            <h1>CONTACT US</h1>
            <h2>Are you planning a stay with us? Get in touch via phone or email to make your reservation today!
            Stay connected with us to find out the latest buzz and special offers at The Kingsbury.</h2>
            
            { send === true ? (
              <div className="send w-full flex flex-col justify-center items-center" style={{ height: '50vh' }}>
                <h1 className='text-5xl font-bold'>REQUEST ACKNOWLEDGEMENT - CONTACT US</h1>
                <h2 className='text-2xl text-orange-700'>We send Email check your inbox</h2>
              </div>
            ) : loading ? (
              <div className="loader-container  w-full flex justify-center items-center gap-12 " style={{ height: '50vh' }} >
                Loading...<div className="loading-spinner"></div>
              </div>
            ) : (
              <div className="contact-form-container">
                <form action="" className='contact-form' onSubmit={handleSubmit}>

                  <div className="form-row">

                    <div className="form-inp">
                      <label htmlFor="">Title</label>
                      <select
                      name="title"
                      id="title"
                      className="py-1 px-2 font-medium"
                      value={formData.title}
                      onChange={handleChange}
                    >
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                    </select>
                    </div>
                    <div className="form-inp relative">
                      <label htmlFor="">First Name</label>
                      <input type="text" name="firstName" id="firstName" className='py-1 px-2 font-medium' value={formData.firstName} onChange={handleChange}/>
                      {errors.firstName && <span className="error">{errors.firstName}</span>}
                    </div>
                    <div className="form-inp">
                      <label htmlFor="">Last Name</label>
                      <input type="text" name="lastName" id="lastName" className='py-1 px-2 font-medium'value={formData.lastName} onChange={handleChange}/>
                      {errors.lastName && <span className="error">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-inp">
                      <label htmlFor="">Phone</label>
                      <input type="text" name="phone" id="phone" className='py-1 px-2 font-medium' value={formData.phone} onChange={handleChange}/>
                      {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>
                    <div className="form-inp">
                      <label htmlFor="">Email</label>
                      <input type="text" name="email" id="email" className='py-1 px-2 font-medium' value={formData.email} onChange={handleChange}/>
                      {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="form-inp">
                      <label htmlFor="">City</label>
                      <input type="text" name="city" id="city" className='py-1 px-2 font-medium' value={formData.city} onChange={handleChange}/>
                      {errors.city && <span className="error">{errors.city}</span>}
                    </div>
                  </div>

                  <div className="form-row form-inp-row">
                      <label htmlFor="">Subject</label>
                      <textarea rows="3" cols="40" className='py-1 px-2 font-medium' name='subject' id='subject' value={formData.subject} onChange={handleChange}/>
                      {errors.subject && <span className="error">{errors.subject}</span>}
                  </div>

                  <div className="form-row form-inp-row">
                      <label htmlFor="">Message</label>
                      <textarea rows="8" cols="40" className='py-1 px-2 font-medium' id='message' name='message' value={formData.message} onChange={handleChange}/>
                      {errors.message && <span className="error">{errors.message}</span>}
                  </div>

                  <div className="form-row form-inp-row ">
                      <label htmlFor="" className='font-medium'>By giving your confirmation you explicitly give consent for us to store and use this information to service your requests.</label>
                      <div className="agreeT flex gap-2">
                        <input type="checkbox" name="consentConfirmation" id="consentConfirmation" checked={isChecked} onChange={handleCheck} />
                        <label htmlFor="" className='font-medium'>I confirm I have read and given consent for the above</label>
                        {isFormSubmitted && !isChecked && (
                          <div className="error">
                            Please accept the agreement before submitting.
                          </div>
                        )}
                      </div>
                  </div>

                  <div className="contact_btn_container">
                    <button type='submit'>SUBMIT</button>
                  </div>

                </form>
              </div>
            ) }

            <div className="contact_details" id='contact-details'>
              <div className="contact_details_row">
                <div className="contact_details_data">
                  <p>ADDRESS : The Kingsbury 48, Janadhipathi Mawatha, Colombo 01, Sri Lanka.</p>
                </div>
              </div>
              <div className="contact_details_row">
                <div className="contact_details_data">
                  <p>PHONE : +94 112 421 221</p>
                </div>
                <div className="contact_details_data">
                  <p>DINING SERVICE : +94 77 108 7720</p>
                </div>
              </div>
              <div className="contact_details_row">
                <div className="contact_details_data">
                  <p>FAX : +94 11 242 1221</p>
                </div>
                <div className="contact_details_data">
                  <p>SPA RESERVATION : +94 11 242 1221</p>
                </div>
              </div>
              <div className="contact_details_row">
                <div className="contact_details_data">
                  <p>INQUIRIES : info@thekingsburyhotel.com</p>
                </div>
              </div>
              <div className="contact_details_row">
                <div className="contact_details_data">
                  <p>RESERVATIONS : reservations@thekingsburyhotel.com</p>
                </div>
              </div>
            </div>

        </div>
        <Footer/>
    </div>
  )
}

export default Contact
