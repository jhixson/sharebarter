
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

/*
var instance = new User();
instance.email = 'hixsonj@gmail.com';
instance.displayName = 'Jesse';
instance.password = 'jh#54321';
instance.save(function (err) {
  console.log('saved!');
});
*/

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.post('/register', routes.register);
app.get('/search', routes.search);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
