const mongoose = require('mongoose');
const jwt = require('jwtoken');
const secretKey = "mynameismaswathourprojectisonlineshoppingsystem";
const retailProductSchema = new mongoose.Schema({
  productName:{
    type:String,
    required:true
  },
  productDescription:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
    },
  price:{
    type:Number,
    required:true
    },
  photo:{
    type:String,
    required:true
    },
  discount:{
    type:Number,
    required:true
    },
  email:{
    type:String,
    required:true
  }  
})



const retailProducts = mongoose.model("retailProduct",retailProductSchema);
 
  
 

  module.exports = retailProducts;