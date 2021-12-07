const IntroModel=require('../models/intromodel');
const User = require('../models/user');
const fs = require('fs');
exports.getintroDetails = async (req, res) => {
    try {
      IntroModel.findOne({ email: req.user.email}, function (err, doc){
        if (doc) {
          return res.render("final", { detail: doc , user:req.user});
        } else {
          res.redirect("/intro");
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  exports.getRender = async (req, res) => {
    try {
      IntroModel.findOne({ email: req.user.email}, function (err, doc){
        if (doc) {
          return res.render("final", { detail: doc , user:req.user }, (err, html) => {
            const content =html
            fs.writeFile('./public/hello.html',content,err=>{
              if(err){
                console.log(err);
                return
              }
              res.redirect('/')
            })
          });
        } else {
          res.redirect("/intro");
        }
      });
      const details = await IntroModel.find();
      
    } catch (error) {
      console.log(error.message);
    }
  };

  exports.addintroForm = async (req, res) => {
    try {
      IntroModel.findOne({ email: req.user.email}, function (err, doc){
        if (doc) {
          return res.render("intro", {edit:true , detail: doc , user:req.user});
        } else {
          return res.render("intro", {edit:false ,user:req.user});
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  exports.postintroDetails = async (req, res) => {
    try {
      var { name , about, emails, projects } = req.body;
      var email = req.user.email;
      emails = emails.split(",");
      projects = projects.split(",");
  
      const image = '/uploads/' + req.file.filename;
      console.log(image)
      //console.log(path);
      IntroModel.findOneAndRemove({email: req.user.email}, function(err){
        console.log(err);
      });
      const newintroDetail = await new IntroModel({
        name,
        about,
        email,
        emails,
        projects,
        image,
      }).save();
     
      return res.redirect("/");
    } catch (error) {
      console.log(error.message);
    }
  };