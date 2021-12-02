const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { spawn } = require('child_process');



const morgan = require('morgan')

var app=express();
const PORT = process.env.PORT||3100;
dotenv.config({ path: './config/config.env' })

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})


app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.set('view engine','ejs');

app.use(morgan("dev"))

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI
        }),
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false
      
     
    })
  )

  
  const Routes = require("./routes/index.js");
  app.use("/", Routes);








app.listen(PORT,console.log(`listening at ${PORT}`))