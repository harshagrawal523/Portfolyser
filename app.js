const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { spawn } = require('child_process');


const flash = require('connect-flash');
require('./config/passport')(passport)

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
  app.use(express.urlencoded({extended : false}));
//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })

  
  const Routes = require("./routes/index.js");
  app.use('/users',require('./routes/users'));
  app.use("/", Routes);








app.listen(PORT,console.log(`listening at ${PORT}`))