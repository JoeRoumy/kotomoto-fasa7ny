var mongoose = require('mongoose');

var interestSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  number:{
    type:Number,
    required:true,
    default:0
  }})
  var Interest = mongoose.model("interest", interestSchema);

  module.exports = Interest;
