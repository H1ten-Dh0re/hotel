const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./router/router');
const session = require('express-session');
const cors = require('cors');
const app = express();
const port = process.env.port || 3000;

app.use(cors());

app.use(session({secret: "thisismypass", resave: true, saveUninitialized: true}));


mongoose.connect("mongodb://localhost:27017/newAuthDB")
.then(() => {
    console.log('Connected to mongodb successfully.');
})
.catch((err) => {
    console.log(err);
})

app.use(express.urlencoded({extended: true}));

app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
})


