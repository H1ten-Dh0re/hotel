const {userSchema} = require('../validations/userValidation');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({secret: "thisismypass", resave: true, saveUninitialized: true}));



const userController = {
    home: (req, res) => {
        res.send("Hello Home Page");
    },
    about: (req, res) => {
        res.send("Hello About section");
    },
    signIn: async (req, res) => {
        try {
          const { value, error } = userSchema.validate(req.body);
          if (error) {
            return res.status(400).json({ message: error.details[0].message });
          }
          const { email, password } = value;
          console.log("Sign In pass: ", password);

          const user = await User.findOne({ email: email});

          const save = await bcrypt.compare(password, user.password);

          if(save){
            req.session.user = user.email;
            return res.status(200).json({ message: "User authenticated", user });
          }
          else {
            console.log("User Nahi Hain");
            return res.status(401).json({ message: "Invalid email or password" });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "Internal server error" });
        }
    }, 
    signUp: async(req, res) => {
      try{
        const {value, error} = userSchema.validate(req.body);
        if(error){
          return res.status(400).json({ message: error.details[0].message });
        }
        const{email, password} = value;
        console.log("Sign Up Pass: ", password);
        const confirm = await User.findOne({email: email});
        if(confirm){
          res.status(400).json({message: 'Email already exist'});
        }
        const salty = await bcrypt.genSalt(saltRounds);
        const hashPasss = await bcrypt.hash(password, salty);
        const user = await User.create({email: email, password: hashPasss});
        await user.save();
        return res.status(200).json({message: "All Good"});
      }
      catch(err){
        console.log(err);
      }
    }
};

module.exports = userController;