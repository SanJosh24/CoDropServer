// routes/auth-routes.js

const express    = require('express');
const authRoutes = express.Router();
const passport   = require('passport');
const bcrypt     = require('bcryptjs');

// require the user model !!!!
const user       = require('../models/user');


authRoutes.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    console.log("starting signup process username <<<<<<<<<<<<<<<<<<<<<<<", username);
    console.log("starting signup process password <<<<<<<<<<<<<<<<<<<<<<<", password);
  
    if (!username || !password) {
        console.log(">>>>>>>>>>>>>>>>>> username or password missing <<<<<<<<<<<<<<<<<<");
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }

    if(password.length < 7){
        console.log("########################## the password is not long enough sapingo!");
        res.status(400).json({ message: 'Please make your password at least 7 characters long for security purposes.' });
        return;
    }
  
    user.findOne({ username }, (err, foundUser) => {

        if(err){
            console.log("error when finding user MIKO JONES $$$$$$$$$$$$$$$$$$$$$$$$$$$", err);
            res.status(500).json({message: "Username check went bad."});
            return;
        }

        if (foundUser) {
            console.log("found a user already, this would have faster with promises SAPINGOOO!!!!!");
            res.status(400).json({ message: 'Username taken. Choose another one.' });
            return;
        }
  
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
  
        const aNewUser = new user({
            username:username,
            password: hashPass,
            email: email,
        });
  
        aNewUser.save(err => {
            if (err) {
                console.log("this errored when creating a user. Again would be better if I had added promises   <><><><>><><<>><>><><><><><<>><>><>", err);
                res.status(400).json({ message: 'Saving user to database went wrong.' });
                return;
            }
            
            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {

                if (err) {
                    console.log("this is an error when logging in user after log in. WHY THE FUCK DID I NOT MAKE PROMISES!?!???!?!?!??!?!?!??!??!?!?!??!", err);
                    res.status(500).json({ message: 'Login after signup went bad.' });
                    return;
                }
                console.log("the user info after signup >>>>>>>>>>>>>>>>>>>>>>> ", aNewUser);
                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewUser);
            });
        });
    });
});



authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user' });
            return;
        }
    
        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return;
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }

            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(theUser);
        });
    })(req, res, next);
});


authRoutes.post('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: 'Log out success!' });
});


authRoutes.get('/loggedin', (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
});


module.exports = authRoutes;


