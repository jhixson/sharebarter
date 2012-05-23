
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , mongoStore = require('session-mongoose');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser({ uploadDir: __dirname + '/public/uploads/tmp' }));
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.session({ secret: "sharbar"
                          , store: new mongoStore({ url: process.env.MONGOLAB_URI || 'mongodb://localhost/test' })
                          , cookie: { path: '/', maxAge: 3600000 * 24 }
  }));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/signup', routes.signup);
app.post('/register', routes.register);
app.post('/finish', routes.finish);
app.get('/list_tmp', routes.list_tmp);

app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
