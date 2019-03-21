const express               = require('express');
const gravatar              = require('gravatar');
const bcrypt                = require('bcryptjs');
const jwt                   = require('jsonwebtoken');
const passport              = require('passport');
const validateLoginInput    = require('../validation/login');
const validateRegisterInput = require('../validation/register');

const router                = express.Router();
const User                  = require('../models/User');
const keys                  = require('../config/keys');

// register route
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid){ // if the input is not valid, returm the errors object
        return res.status(400).json(errors);
    }

    // check to see if user already exists in database
    User.findOne({ email: req.body.email })
        .then( user => {
            if(user) { // user exists
                return res.status(400).json({
                    email: 'User already registered with this email'
                });
            }else{ // user does not exists in database => create a record with the user information
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar
                });

                bcrypt.genSalt(11, (err, salt) => {
                    if(err) console.error('genSalt :: There was an error: ', err);
                    else{
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) console.error('hash :: There was an error: ', err);
                            else{
                                newUser.password = hash;
                                newUser
                                    .save()
                                    .then( user => { res.json(user) }); // after creating the user and hashing the password
                                                                       // send the user object as response
                            }
                        })
                    }
                });
            }
        })
});

// login route
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput (req.body);
    
    if(!isValid){ // user input is not valid => return error object
        return res.status(400).json(errors);
    }

    // user input is valid for certain

    const email     = req.body.email;
    const password  = req.body.password;
    
    User.findOne({email})
        .then( user => {
            if(!user){ // no user was found with the given email address
                errors.email = 'User not found with this email address'
                return res.status(400).json(errors);
            }

            bcrypt.compare(password, user.password) // compare the given password with the hashed password to see if they are the same
                  .then( isMatch => {
                      if(isMatch){ // the given credentials are good => can generate the token
                        const payload = {
                            id:     user.id,
                            name:   user.name,
                            avatar: user.avatar
                        }
                        jwt.sign(payload, keys.jwtSecret, {
                            expiresIn: 7200 // the token will expire in 2 hours
                        }, (err, token ) => {
                            if(err) console.error('token :: There was an error', err);
                            else{ // the token has been generated wth succes => send the token back in Authentification Bearer format
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                      } else{ // the given credentials are not good => return error
                            errors.password = 'Incorect password'
                            return res.status(400).json(errors);
                      }
                  });
        });

});

router.get('/current_user', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id:     req.user.id,
        name:   req.user.name,
        email:  req.user.email
    });
});

module.exports = router;
    

