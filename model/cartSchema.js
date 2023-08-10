const mongoose = require('mongoose');
const jwt = require('jwtoken');
const secretKey = "mynameismaswathourprojectisonlineshoppingsystem";
const cartSchema = new mongoose.Schema({
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
  },
  remail:{
    type:String,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  }
})



const carts = mongoose.model("cart",cartSchema);
 
  
 

  module.exports = carts;