var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:user@ds137141.mlab.com:37141/online-judge-system');


// You can think of router as a “mini-application,” 
// capable only of performing middleware and routing functions.
// A router behaves like middleware itself, 
// so you can use it as an argument to app.use() or as the argument to another router’s use() method.

var restRouter = require('./routes/rest.js');
var indexRouter = require('./routes/index.js');

var path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);

app.use('/api/v1', restRouter);

app.use(function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, '../public')});
});

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

var http = require('http');
var socketIO = require('socket.io');
var io =socketIO();

var editorSocketService = require('./services/editorSocketService')(io)

// create http server
var server = http.createServer(app);
io.attach(server);
server.listen(3000);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  throw error;
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
