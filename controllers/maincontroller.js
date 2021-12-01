const IntroModel=require('../models/intromodel');

exports.getintroDetails = async (req, res) => {
    try {
      const details = await IntroModel.find();
      return res.render("final", { details });
    } catch (error) {
      console.log(error.message);
    }
  };

  exports.addintroForm = async (req, res) => {
    try {
      return res.render("intro");
    } catch (error) {
      console.log(error.message);
    }
  };

  exports.postintroDetails = async (req, res) => {
    try {
      var { name , about } = req.body;
      
  
      const image = '/uploads/' + req.file.filename;
      console.log(image)
      //console.log(path);
      const newintroDetail = await new IntroModel({
        name,
        about,
        image,
      }).save();
     
      return res.redirect("/");
    } catch (error) {
      console.log(error.message);
    }
  };