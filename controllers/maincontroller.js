const IntroModel = require('../models/intromodel');
const WorkModel = require('../models/workmodel');
const EducationModel = require('../models/educationmodel');
const User = require('../models/user');
const fs = require('fs');
exports.getintroDetails = async (req, res) => {
  try {
    const details = await IntroModel.find();
    return res.render("final", { details, user: req.user });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getRender = async (req, res) => {
  try {
    const details = await IntroModel.find();
    return res.render("final", { details, user: req.user }, (err, html) => {
      const content = html
      fs.writeFile('./public/hello.html', content, err => {
        if (err) {
          console.log(err);
          return
        }
        res.redirect('/')
      })
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.addintroForm = async (req, res) => {
  try {
    return res.render("intro", { user: req.user });
  } catch (error) {
    console.log(error.message);
  }
};

exports.addeduForm = async (req, res) => {
  try {
    return res.render("education", { user: req.user });
  } catch (err) {
    console.log(err.message);
  }
}

exports.postintroDetails = async (req, res) => {
  try {
    var { name, about, email } = req.body;

    const image = '/uploads/' + req.file.filename;
    console.log(image)
    //console.log(path);
    const newintroDetail = await new IntroModel({
      name,
      about,
      email,
      image,
    }).save();

    return res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};

exports.posteduDetails = async (req, res) => {
  try {
    const { company, work_description, work_start, work_end } = req.body;
    const { university, degree, percentage, degree_start, degree_end } = req.body;
    await new WorkModel({ company, work_description, work_start, work_end }).save();
    await new EducationModel({ university, degree, percentage, degree_start, degree_end }).save();
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
  }
};