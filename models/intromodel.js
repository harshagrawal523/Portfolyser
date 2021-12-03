const mongoose=require('mongoose');
const Schema=mongoose.Schema;


let introSchema=new Schema({
    name: {type: String,required:true},
    about:{type: String,required:false},
    email:{type: String,required:false},
    image:{type: String,required:false},
});

const Intro=mongoose.model('intro',introSchema);

module.exports=Intro;