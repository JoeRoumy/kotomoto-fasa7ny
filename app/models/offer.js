var mongoose = require('mongoose');

var offerSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  discount:{
    type:Number,
  },
  deadline:{
    type:Date,
    required:true
  },
  activities:[{
    type:mongoose.Schema.Types.ObjectId,ref:'activity',
    required:true
  }],
  isActive:{
    type:Boolean,
    required:true,
    default:0
  }})

  var Offer = mongoose.model("offer", offerSchema);

  module.exports = Offer;
