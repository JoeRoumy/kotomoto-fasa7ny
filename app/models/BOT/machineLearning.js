var mongoose = require('mongoose');

var machineLearningSchema = mongoose.Schema({
  user: {type:mongoose.Schema.Types.ObjectId,ref:'botUser'},
  inMessage: String,
  outMessage: String,
  outScenario: {type:mongoose.Schema.Types.ObjectId,ref:'scenario'}
})

var MachineLearning = mongoose.model("machineLearning", machineLearningSchema);

module.exports = MachineLearning;
