// server.js

// set up ========================
var express 	= require('express');
var app 		= express();	
var mongoose 	= require('mongoose');	
var morgan		= require('morgan');	
var bodyParser	= require('body-parser');
var methodOverride = require('method-override');


// configuration =================
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  mongoose.connect('mongodb://node:nodeuser1@ds139950.mlab.com:39950/todo-app-db');  
});

app.use(express.static(__dirname + '/public')); 
app.use(morgan('dev'));  
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());  
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

app.listen(8085);
console.log("App listening on port 8085");

// define schema ================
// var todoSchema = mongoose.Schema({
  // text: String
// });

// define model =================
    var Todo = mongoose.model('Todo', {
        text : String
    });
	//var Todo = mongoose.model('Todo', todoSchema);
	
// routes ======================================================================
	// api ---------------------------------------------------------------------
    // get all todos
	app.get('/api/todos', function(req, res) {

		// var testingTodo = new Todo({ text: 'testing todo app ' });
		// console.log(testingTodo.text); // 'testing todo '
		// console.log(testingToto.collection)
		// Todo.create(testingTodo, 
			// function(err, todo) {
				// if (err)
					// res.send(err);
			// }
		// );
	
		Todo.find({}, function(err, docs) {
			console.log(err);
			console.log(docs);
			if (!err){ 
				console.log(docs);
				res.json(docs);
				process.exit();
			} else {throw err;}
		});
		
        // use mongoose to get all todos in the database
        // Todo.find(function(err, todos) {

            // // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            // if (err)
                // res.send(err)
			// console.log(err);
			// console.log(todos);
            // res.json(todos); // return all todos in JSON format
        // });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
				console.log(todos);
                res.json(todos);
            });
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
				console.log(todos);
                res.json(todos);
            });
        });
    });
	
	
	// application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });