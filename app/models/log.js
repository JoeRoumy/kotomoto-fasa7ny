var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
  type:{
    type:String,
    required:true
  },
  time:{
    type:Date,
    required:true,
    default: Date.now
  },
  errorMessage:{
    type:String,
    required:true
  }})

  var Log = mongoose.model("log", logSchema);

  module.exports = Log;
