const isEmpty = require('is-empty');
const validator = require('validator');

// Validating login
// data is the json object which we get after post is triggered
// if it returns isValid as 1 then no errors
module.exports.loginValidator = (data) => {
    const errors = {};
    
    //Preventing undefined values
    console.log(data.email);
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    let emailError = validator.isEmpty(data.email) ? "Email is required" : (!validator.isEmail(data.email) ? 'Please provide a valid email' : '');
    let passwordError = validator.isEmpty(data.password) ? "password is required" :'';
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

// Validating registration
// if it returns isValid as 1 then no errors
module.exports.registerValidator = (data) => {
    const errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    

    let emailError = validator.isEmpty(data.email) ? "Email is required" : (!validator.isEmail(data.email) ? 'Please provide a valid email' : '');
    let passwordError = validator.isEmpty(data.password) ? "password is required" :'';
    let firstNameError = validator.isEmpty(data.firstName) ? "firstName is required" :'';
    let lastNameError = validator.isEmpty(data.lastName) ? "lastName is required" :'';
    
    if (emailError) errors.message = emailError;
    if (passwordError) errors.message = passwordError;
    if (firstNameError || lastNameError) errors.message = 'Full Name is required';

    return {
        errors,
        isValid: isEmpty(errors)
    }
}