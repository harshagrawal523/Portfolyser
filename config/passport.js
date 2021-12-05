const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./auth');

module.exports = function(passport){
    passport.use('local',
        new LocalStrategy({usernameField: 'email'},(email,password,done)=>{
            //match user
            User.findOne({email:email})
            .then((user)=>{
                if(!user){
                    return done(null,false,{message:'email not registered'});
                }
                //math passwords
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user);
                    } else{
                        return done(null,false,{message: 'password incorrect'});
                    }
                })
            })
            .catch((err)=>{console.log(err)})
        })
    )
    passport.serializeUser(function(user,done) {
        done(null,user.id);
    })
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        })
    })
    passport.use(
        new GoogleStrategy(
          {
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: '/auth/google/callback',
          },
          async (accessToken, refreshToken, profile, done) => {
           
            //get the user data from google 
            const newUser = {
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value,
              
            }
    
            try {
              //find the user in our database 
              let user = await User.findOne({ googleId: profile.id })
    
              if (user) {
                //If user present in our database.
                done(null, user)
              } else {
                // if user is not preset in our database save user data to database.
                user = await User.create(newUser)
                done(null, user)
              }
            } catch (err) {
              console.error(err)
            }
          }
        )
      )
    
}