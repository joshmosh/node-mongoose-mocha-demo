var mongoose = require('mongoose');
var user = require('./../models/user');

mongoose.connect('mongodb://localhost/user_test');

describe('Users', function(){
  var currentUser = null;

  beforeEach(function(done){
    user.register('test@test.com', 'password', function(doc){
      currentUser = doc;
      done();
    });
  });

  afterEach(function(done){
    user.model.remove({}, function(){
      done();
    });
  });

  it('registers a new user', function(done){
    user.register('test2@test.com', 'password', function(doc){
      doc.email.should.eql('test2@test.com');
      done();
    });
  });

  it('fetches user by email', function(done){
    user.findByEmail('test@test.com', function(doc){
      doc.email.should.eql('test@test.com');
      done();
    });
  });
});