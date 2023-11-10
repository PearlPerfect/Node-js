const handleError = (err) =>{
    // console.log(err.message, err.code);
    let errors = {username: " ",
                    email: " ",
                password: " "};

        if(err.message.includes("User validation failed")){
            Object.values(err.errors).forEach(({properties})=>{
              
                errors[properties.path] = properties.message
                // value= err.errors[Object.keys(err.errors)[0]].message;  //get the first error message from mongoose
            })
            return errors
        }
 }

 module.exports = {handleError}