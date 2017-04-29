var mongoose = require('mongoose');

var serviceProviderSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  serviceProviderAccountId:{
    type:mongoose.Schema.Types.ObjectId,ref:'account',
    required:true
  },
  description:{
    type:String,
    required:true
  },
  legalProof:{
    type:String,
    required:true
  },
  entertainmentType:[{
    type:String,
    required:true
  }],
  activities:[{
    type:mongoose.Schema.Types.ObjectId,ref:'activity',
    required:true
  }],
  branches:[{
    type:String,
    required:true
  }],
  contactMobile:[{
    type:String,
    required:true
  }],
  // media:[{
  //   type:{type:String},
  //   url:{type:String}
  // }],
  media:[{
    type:String
  }],
  previousClients:[{
    type:mongoose.Schema.Types.ObjectId,ref:'user',
    required:true
  }],
  Approved:{
    type:Number,
    default: 0
  },
  isGolden:{
    type:Boolean,
    default:0
  },
  rating:{
    type:Number,
    default: -1
  },
  ratingCount:{
    type:Number,
    default: 0
  },
  banned:{
    type:Number,
    default: 0,
    required:true
  },
  subscribedUsers:[{
    type:mongoose.Schema.Types.ObjectId,ref:'user',
    required:false
  }]
})

var ServiceProvider = mongoose.model("serviceProvider", serviceProviderSchema);

module.exports = ServiceProvider;
