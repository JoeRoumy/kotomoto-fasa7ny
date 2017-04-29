var mongoose = require('mongoose');

var complainSchema = mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,ref:'user',
    required:true
  },
  providerId:{
    type:mongoose.Schema.Types.ObjectId,ref:'serviceProvider',
    required:true
  },
  isUserToProvider:{
    type:Boolean,
    required:true
  },
  complain:{
    type:String,
    required:true
  },
  isSeen:{
    type:Boolean,
    required:true,
    default: false
  }})

  var Complain = mongoose.model("complain", complainSchema);

  module.exports = Complain;
