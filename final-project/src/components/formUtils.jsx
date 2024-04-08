const handleInputChange = (event, formData, setFormData, errors, setErrors) => {

  const { name, value , checked } = event.target;
  const newErrors = { ...errors };

  
  if(name === 'firstName'){
    if(value.trim() === ''){
        newErrors[name] = "First name is required";
    }else{
        delete newErrors[name];
    }
  }

  if(name === 'lastName'){
    if(value.trim() === ''){
        newErrors[name] = "last Name is required";
    }else{
        delete newErrors[name];
    }
  }

  if(name === 'phone'){
    if(value.trim() === ''){
        newErrors[name] = "phone is required";
    }else if( !(/^[0-9]+$/).test(value) ){
        newErrors[name] = "phone should be numaric";
    }else if( value.length != 10 ){
        newErrors[name] = "please enter valid phone number ";
    }else{
        delete newErrors[name];
    }
  }

  if(name === 'email'){
    if(value.trim() === ''){
        newErrors[name] = "email is required";
    }else if( !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(value) ){
        newErrors[name] = "enter valid email";
    }else{
        delete newErrors[name];
    }
  }

  if(name === 'city'){
    if(value.trim() === ''){
        newErrors[name] = "city name is required";
    }else{
        delete newErrors[name];
    }
  }

  if(name === 'subject'){
    if(value.trim() === ''){
        newErrors[name] = "subject is required";
    }else{
        delete newErrors[name];
    }
  }

  if(name === 'message'){
    if(value.trim() === ''){
        newErrors[name] = "message is required";
    }else{
        delete newErrors[name];
    }
  }

  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
  setErrors(newErrors);
};

export default handleInputChange;
