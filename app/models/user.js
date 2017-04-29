var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  userAccountId:{
    type:mongoose.Schema.Types.ObjectId,ref:'account'
  },
  numberOfLogins:{
    type:Number,
    default:0
  },
  birthDate:{
    type:Date,
    required:true
  },
  age:{
    type:Number,
    $subtract: [ new Date(), "$birthDate" ]
  },
  gender:{// true -> male
    type:Boolean,
    required:true
  },
  privacy:{
    type:Number,
    required:true
  },
  mobileNumber:{
    type:String,
    required:false
  },
  profilePicture:{
    type:String,
    required:false
  },
  interests:[{
    type:String,
    required:false
  }],

  profession:{
    type:String,
    required:false
  },
  history:[{
    type:mongoose.Schema.Types.ObjectId,ref:'activity',
  }],
  location:[{
    type:mongoose.Schema.Types.String,
  }],
  banned:{
    type:Number,
    default: 0,
    required:true
  },
  wishlist:[{type:mongoose.Schema.Types.ObjectId,ref:'activity'}]
});

var User = mongoose.model("user", userSchema);

module.exports = User;
