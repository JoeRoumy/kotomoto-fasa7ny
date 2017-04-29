var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
  adminAccountId:{
    type:mongoose.Schema.Types.ObjectId,ref:'account'
  },
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  }})

  var Admin = mongoose.model("admin", adminSchema);

  module.exports = Admin;
