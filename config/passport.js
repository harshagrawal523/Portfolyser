const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook');
var TwitterStrategy = require('passport-twitter');
var GithubStrategy = require('passport-github2');
var DiscordStrategy = require('passport-discord').Strategy;


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
    passport.use('google', new GoogleStrategy({

        clientID        : process.env.clientId_google,
        clientSecret    : process.env.clientSecret_google,
        callbackURL     : 'http://127.0.0.1:3100/users/google/callback',

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ email : profile.emails[0].value }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // user not found, so created a new one
                    const newUser = new User({
                        name : profile.displayName,
                        email : profile.emails[0].value,
                        password : "somerandompasswordhere123^&^"
                    });
                    newUser.save()
                    .then((value)=>{
                        console.log(value)
                        return done(null, user);
                    });
                }
            });
        });

    }));
    passport.use('facebook', new FacebookStrategy({

        clientID        : process.env.clientId_facebook,
        clientSecret    : process.env.clientSecret_facebook,
        callbackURL     : 'http://127.0.0.1:3100/users/facebook/callback',

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ email : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // user not found, so created a new one
                    const newUser = new User({
                        name : profile.displayName,
                        email : profile.id,
                        password : "somerandompasswordhere123^&^"
                    });
                    newUser.save()
                    .then((value)=>{
                        console.log(value)
                        return done(null, user);
                    });
                }
            });
        });
    }));

    passport.use('twitter', new TwitterStrategy({

        consumerKey        : process.env.apikey_twitter,
        consumerSecret    : process.env.apisecret_twitter,
        callbackURL     : 'http://127.0.0.1:3100/users/twitter/callback',

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ email : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // user not found, so created a new one
                    const newUser = new User({
                        name : profile.displayName,
                        email : profile.id,
                        password : "somerandompasswordhere123^&^"
                    });
                    newUser.save()
                    .then((value)=>{
                        console.log(value)
                        return done(null, user);
                    });
                }
            });
        });
    }));

    passport.use('github', new GithubStrategy({

        clientID        : process.env.clientId_github,
        clientSecret    : process.env.clientSecret_github,
        callbackURL     : 'http://127.0.0.1:3100/users/github/callback',

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ email : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // user not found, so created a new one
                    const newUser = new User({
                        name : profile.displayName,
                        email : profile.id,
                        password : "somerandompasswordhere123^&^"
                    });
                    newUser.save()
                    .then((value)=>{
                        console.log(value)
                        return done(null, user);
                    });
                }
            });
        });
    }));

    passport.use('discord', new DiscordStrategy({

        clientID        : process.env.clientId_discord,
        clientSecret    : process.env.clientSecret_discord,
        callbackURL     : 'http://127.0.0.1:3100/users/discord/callback',
        scope          : ['identify']

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
            console.log(profile);

            // try to find the user based on their google id
            User.findOne({ email : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // user not found, so created a new one
                    const newUser = new User({
                        name : profile.username,
                        email : profile.id,
                        password : "somerandompasswordhere123^&^"
                    });
                    newUser.save()
                    .then((value)=>{
                        console.log(value)
                        return done(null, user);
                    });
                }
            });
        });
    }));
}