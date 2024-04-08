import React, { useState } from 'react'
import '../css/admin.css'
import { useNavigate } from 'react-router-dom';

const initialFormState = {
    email:'',
    password:'',
}
const validateEmail = (email) => {
    if (!email) {
      return 'Email is required';
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }if(email!=="sandaruwan0427@gmail.com"){
        return ' wrong email ! '
    }
    return null;
  };
const validatePassword = (password) => {
    if(!password){
        return 'password is required';
    }else if(password.length < 6){
        return 'password must be at least 6 characters '
    }if(password!=='peellakanda'){
        return ' wrong password !'
    }
    return null ;
};

function Alogin() {

    const [formData,SetFormData] = useState(initialFormState);
    const [errors,setErrors] = useState({});
    const [isSubmitting,SetIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name,value}  = e.target ;
        SetFormData((prevData) => ({
            ...prevData,
            [name]:value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {
            email: validateEmail(formData.email),
            password: validatePassword(formData.password),
        };
        setErrors(newErrors);
        const hasErrors = Object.values(newErrors).some((error) => error !== null );
        if(!hasErrors){

                navigate(`/admin/${'Admin'}`);
                SetFormData(initialFormState);

        }
    };

    const handleKeyDown = (e) => {
        if(e.key == 'Enter'){
            handleSubmit(e);
        }
    }

  return (
    <div className='login-container'>
            <div className='login'>
                <div className="login-banner">
                    <h2>Peellakanda</h2>
                    <div className="baner-img">
                        <img src="/admin/loginBanner.png" alt="" />
                    </div>
                    <h3>Admin Dashboard</h3>
                </div>
                <div className="login-form-con">
                    <h2>LOGIN</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="login-form-row">
                            Email id
                            <input type="text" value={formData.email} onKeyDown={(e)=>{ if(e.key === 'Enter'){ handleSubmit(e);}}} onChange={handleChange} name='email'/>
                            {errors.email && <div className="text-center text-red-500 text-sm">{errors.email}</div>}
                        </div>
                        <div className="login-form-row">
                            Password
                            <input type="password" value={formData.password} onKeyDown={handleKeyDown} onChange={handleChange} name='password' />
                            {errors.password && <div className='text-center text-red-500 text-sm'>{errors.password}</div>}
                        </div>
                        <button type='submit' disabled={isSubmitting}>
                            LOGIN
                        </button>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default Alogin
