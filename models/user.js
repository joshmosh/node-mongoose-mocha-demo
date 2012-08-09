/*
 * User Model
 *
 * Instead of following the traditional Mongoose examples, I'm
 * using a function to provide both private and public methods to
 * this model to keep things more organized!
 */

var User = function(){
  var mongoose = require('mongoose');
  // Kinda redundant, but needed
  var Schema = require('mongoose').Schema;
  // Mongoose schema so Mongoose can make effective queries
  var userSchema = new Schema({
    email : { type: String, index: { unique: true, required: true }},
    password: { type: String, required: true }
  });

  // Declaring a private model for internal methods
  var _model = mongoose.model('user', userSchema);
  // Creating a register method for convenience
  var _register = function(email, password, callback){
    _model.create({ email: email, password: password }, function(e, doc){
      if(e) {
        fail(e);
      } else {
        callback(doc);
      }
    });
  };
  // Creating a findByEmail method for convenience
  var _findByEmail = function(email, success, fail){
    _model.findOne({ email: email }, function(e, doc){
      if(e) {
        fail(e);
      } else {
        success(doc);
      }
    });
  }

  // Returning properties and methods we'd like to be public
  return {
    register: _register,
    schema: userSchema,
    model: _model,
    findByEmail: _findByEmail
  }
}();

module.exports = User;