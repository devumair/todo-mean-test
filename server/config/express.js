var express         = require('express'),
logger          = require('morgan'),
bodyParser      = require('body-parser'),
methodOverride  = require('method-override'); //,
//cookieParser    = require('cookie-parser'),
//session         = require('express-session'),
//passport        = require('passport');


module.exports = function(app, config){

app.set('view engine', 'ejs');
app.set('views', 'server/views');
//app.use(cookieParser()); //required for auth sessions
//app.use(bodyParser()); //must come after cookie parser
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());  
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
//app.use(session({secret: 'healing center'})); //required for auth sessions
//app.use(passport.initialize());  //initialize passport middleware
//app.use(passport.session());   //telling passport to use sessions
app.use('/js', express.static(config.rootPath + '/client/js'));
app.use(methodOverride('X-HTTP-Method-Override')); // simulate delete/put
app.use(express.static(config.rootPath + '/client')); // set the static files location /client/img will be /img for users
}