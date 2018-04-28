
const express = require('express');
const http = require('http');
const socket = require('socket.io');

const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();
const server = http.Server(app);
const io = socket(server);

// Setup middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/../client/dist'));

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('port', (process.env.PORT || 3000));


//Here are the routes we use
require('./routes.js').passportRoutes(app, passport);
require('./routes.js').challengeRoutes(app);
require('./routes.js').databaseRoutes(app);

let connections = [];
// socket.io
io.on('connection', (client) => {
  console.log('socket connected');
  
  client.on('message', (data) => {
    console.log('message', data);
    for (connection of connections) {
      connection.emit('message', data)
    }
  })
  
  client.on('subscribeToMessage', (data) => {
    console.log('new subscriber', data);
  })

  connections.push(client);

  client.on('disconnect', () => {
    connections.splice(connections.indexOf(client), 1);
    console.log('client disconnected');
  })

  client.emit('message', 'connected!')
});

// begin timer
const ioTimer = io.of('/timer');

ioTimer.on('connection', (interval) => {
  console.log('ioTimer connected');
  interval.on('getDate', () => {
    interval.emit('date', new Date())
  })
})


server.listen(app.get('port'), function() {
  console.log('Server started on port:' + app.get('port'));
});
// end timer

module.exports = app;
