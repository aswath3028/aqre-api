const mongoose = require('mongoose');
const jwt = require('jwtoken');
let number=1;
const secretKey = "mynameismaswathourprojectisonlineshoppingsystem";
const RetailSchema = new mongoose.Schema({

    name:{
      type:String,
      required:true
    },
    address:{
      type:String,
      required:true
    },
    mobile:{
      type:Number,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true
    }
  });


  
 
  const retailers = mongoose.model("retailer",RetailSchema);
 

  module.exports = retailers;