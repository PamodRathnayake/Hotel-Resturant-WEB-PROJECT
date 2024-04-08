function validations(values){
    let error = {}
  
    if (values.name === "") {
      error.name = "name should not be empty";
    } else if (values.name.length <= 4) {
      error.name = "greater than 4 char";
    } else {
      error.name = "";
    }
      
    if(values.email === "" ){
      error.email = "email should not be empty"
    }else{
      error.email = "";
    }
    
    if(values.password === ""){
      error.password = " password should not be empty "
    }else if (values.password.length <= 8) {
    error.password = "password should be greater than 8";
    }else{
      error.password  = "";
    }

    if(values.com_pass === ""){
      error.com_pass = " comfirm password should not be empty "
    }else if ( values.com_pass === values.password ) {
    error.com_pass = "Comfirm password wrong";
    }else{
      error.com_pass  = "";
    }

    if(values.mobile === ""){
        error.mobile = " mobile should not be empty  "
    } else if ( !(/^[0-9]+$/).test(values.mobile) ){
        error.mobile = " mobile only contain numbers "
    }  else if ( values.mobile.length != 10 ){
        error.mobile = " mobile should be 10 num "
    } else{
        error.mobile  = "";
    }

   if(!values.agree){
    error.agree = " agree to terms and con... "
   }else{
    error.agree = ""
   }
  
    return error ;
  }
  export default validations;