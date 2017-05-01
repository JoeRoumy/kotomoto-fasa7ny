var mongoose = require('mongoose');

var scenarioSchema = mongoose.Schema({
  title: String,
  messages:[{
    type: String,
    required:true
  }],
  buttons: [{
    text: String,
    event : String
  }]
})

var Scenario = mongoose.model("scenario", scenarioSchema);

module.exports = Scenario;
