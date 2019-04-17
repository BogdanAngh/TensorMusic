const Validator = require('validator');
const isEmpty   = require('./is-empty');

module.exports = function validateRegisterInput (data){
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    // name errors
    if(!Validator.isLength(data.name, { min: 2, max: 30})){
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }
    
    // email errors
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email is required';
    }

    // password errors
    if(!Validator.isLength(data.password, { min: 6, max: 30})){
        errors.password = 'Password must have at least 6 characters';
    }

    if(Validator.isAlpha(data.password)){
        errors.password = 'Password must contain letters and numbers';
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }

    // password_confirm errors
    if(!Validator.equals(data.password, data.password_confirm)){
        errors.password_confirm = 'Passwords must match';
    }

    if(Validator.isEmpty(data.password_confirm)){
        errors.password_confirm = 'You must confirm you password';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}
