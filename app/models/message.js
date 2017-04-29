var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
fromId:{
  //changed to string from number
  type: String,
  required: true
},
message:[{
  isUser:{type:Boolean},
  message:{type:String},
  time:{type:String},
}],
isSeen:{
  type:Boolean,
  required:true
}})

var Message = mongoose.model("message", messageSchema);

module.exports = Message;
