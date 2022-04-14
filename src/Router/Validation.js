
const Validation = (values) => {
    let errors={};
    if(!values.name){
        errors.name="Name is Required."
    }
    if (!values.email) {
        errors.email= "Email is required."
    }
    if(!values.password){
        errors.password="Password is Required."
    }else if (values.password.length <5) {
        errors.password= "Password Must be more than 6 characters"
        
    }
  return errors;
}

export default Validation