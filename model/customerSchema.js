const mongoose = require('mongoose');
const jwt = require('jwtoken');
const secretKey = "mynameismaswathourprojectisonlineshoppingsystem";
const CustomerSchema = new mongoose.Schema({

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


  
 
  const customers = mongoose.model("customer",CustomerSchema);
 

  module.exports = customers;