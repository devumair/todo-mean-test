// var MongoClient = require('mongodb').MongoClient,
  // f = require('util').format,
  // assert = require('assert');

// // Connection URL
// var url = 'mongodb://node:nodeuser1@ds139950.mlab.com:39950/todo-app-db';
// // Use connect method to connect to the Server
// MongoClient.connect(url, function(err, db) {
  // assert.equal(null, err);
  // console.log("Connected correctly to server");

  // db.close();
// });



var MongoClient = require('mongodb').MongoClient,
  f = require('util').format,
  assert = require('assert');

// Connection URL
var url = 'mongodb://dev.umair:130624@ua@ds139950.mlab.com:39950?authMechanism=MONGODB-CR&authSource=todo-app-db?authSource=dev.umair';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  db.close();
});