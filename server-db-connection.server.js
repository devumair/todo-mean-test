// modules =================================================
var express         = require('express');    
var mongoose        = require('mongoose');


// Node Environment Configuration ===========================================
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./server/config/config')[env];
    


// Create an Instance of Express ===========================================
var app            = express();


// Modules of app ===========================================
require('./server/config/express.js')(app, config); // Express Configuration
//require('./server/config/mongoose.js')(config);     // Database Configuration
//require('./server/config/routes.js')(app);          // Routes Configuration
//require('./server/config/passport.js')();           // Passsport Configuration


module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', function callback () {
    console.log("Connection error");
  });
  db.once('open', function callback () {
    console.log("Mongo working!");
  });
}

// Databse Connection ==================================================
mongoose.connect('mongodb://node:nodeuser1@ds139950.mlab.com:39950/todo-app-db');
var db = mongoose.connection;


// start app ===============================================
//app.listen(config.port);    
app.listen(8085);    
//console.log('listening on port ' + config.port);        // shoutout to the user
console.log('listening on port 8085');        // shoutout to the user
exports = module.exports = app;     


// define model =================
    var Todo = mongoose.model('Todo', {
        text : String
    }, 'todos');
	
	
	app.get('/api/todos', function(req, res) {

		// Todo.find({}, function(err, docs) {
			// console.log(err);
			// console.log(docs);
			// if (!err){ 
				// console.log(docs);
				// res.json(docs);
				// process.exit();
			// } else {throw err;}
		// });
		
        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
			console.log(err);
			console.log(todos);
            res.json(todos); // return all todos in JSON format
        });
    });