// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model

var Schema = mongoose.Schema;

var NerdSchema = new Schema({
  name:  String,
  NerdLVL : Number
});


// assign a function to the "methods" object of our animalSchema
NerdSchema.methods.findSimilarTypes = function(cb) {
  return this.model('Nerd').find({ NerdLVL: this.NerdLVL }, cb);
};

NerdSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};
var Nerd = mongoose.model('Nerd', NerdSchema);


// var nerd = new Nerd();
//
// nerd.findSimilarTypes(function(err, nerds) {
//   console.log(nerds); // woof
// });
// module.exports allows us to pass this to other files when it is called
// module.exports = mongoose.model('Nerd', NerdSchema);
module.exports = Nerd;
