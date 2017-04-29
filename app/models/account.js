var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var accountSchema = mongoose.Schema({
  userName:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  type:{
    type:Number,  //user 0, SP 1, visitor for newsletter 2,admin 3
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },

  facebook         : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  },
  twitter          : {
    id           : String,
    token        : String,
    displayName  : String,
    username     : String
  },
  google           : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  }

});

// generating a hash
accountSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
accountSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var Account = mongoose.model("account", accountSchema);

module.exports = Account;
