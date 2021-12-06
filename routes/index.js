const router = require('express').Router();
const body = require('body-parser');
const multer = require("multer");
const introController=require('../controllers/maincontroller');
var path = require('path');
const {ensureAuthenticated} = require("../config/auth.js")



var profile = "hello";
var Storage = multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req , file , cb) => {
      cb(null , file.fieldname+"_"+profile+"_"+path.extname(file.originalname))
    }
  
   })
  
   var upload_company_logo = multer({
     storage:Storage
   }).single('profile_pic');


router.use(body.urlencoded({
    extended: true
  }));


router.get("/",ensureAuthenticated,(req,res)=>{
    res.render('home',{user:req.user});
});
router.get('/register', (req,res)=>{
  res.render('register');
})

router.get("/final" , introController.getintroDetails);

router.get("/render", introController.getRender);

router.get("/intro" ,ensureAuthenticated, introController.addintroForm);
router.post(
    "/",
    upload_company_logo,
    introController.postintroDetails
  );



module.exports = router;
