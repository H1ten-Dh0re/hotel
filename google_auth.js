const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const clientID = require('./config/secret').clientId;
const clientSecret = require('./config/secret').clientSecret;
const app = express();
const port = 4000;
const User = require('./models/user');
const session = require('express-session'); 

function isLoggedIn(req, res, next){
    req.user ? res.redirect('http://localhost:5500') : res.sendStatus(401)
}

app.use(session({secret:"thisismysecret", resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "http://localhost:4000/auth/google/callback",
    passReqToCallback   : true
  },
  function (request, accessToken, refreshToken, profile, done){
    done(null, profile)
  }
));


app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }

));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));


app.get('/auth/google/success', isLoggedIn, (req, res) => {
    res.send("Hain bhai hain ");
})

app.get('/auth/google/failure', (req, res) => {
    res.json("Failure");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
})

passport.serializeUser((profile, done) => {
    done(null, profile);
})

passport.deserializeUser((profile, done) => {
    done(null, profile);
})


