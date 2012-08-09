var User = function(){
  var mongoose = require('mongoose');
  var Schema = require('mongoose').Schema;
  var userSchema = new Schema({
    email : { type: String, index: { unique: true, required: true }},
    password: { type: String, required: true }
  });

  var _model = mongoose.model('user', userSchema);
  var _register = function(email, password, callback){
    _model.create({ email: email, password: password }, function(e, doc){
      if(e) {
        fail(e);
      } else {
        callback(doc);
      }
    });
  };
  var _findByEmail = function(email, success, fail){
    _model.findOne({ email: email }, function(e, doc){
      if(e) {
        fail(e);
      } else {
        success(doc);
      }
    });
  }

  return {
    register: _register,
    schema: userSchema,
    model: _model,
    findByEmail: _findByEmail
  }
}();

module.exports = User;