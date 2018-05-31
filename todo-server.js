// server.js

// set up ========================
var express 	= require('express');
var app 		= express();	
var morgan		= require('morgan');	
var bodyParser	= require('body-parser');
var methodOverride = require('method-override');


// configuration =================
var MongoClient = require('mongodb').MongoClient

var URL = 'mongodb://node:nodeuser1@ds139950.mlab.com:39950/todo-app-db'

var db = require('./db')

app.use(express.static(__dirname + '/public')); 
app.use(morgan('dev'));  
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());  
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// Connect to Mongo on start
db.connect(URL, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})

app.listen(8085);
console.log("App listening on port 8085");

