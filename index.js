var fs = require('fs');
var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var morgan = require('morgan'); // Charge le middleware de logging
var favicon = require('serve-favicon'); // Charge le middleware de favicon
var JsonDB = require('node-json-db');


var app = express();

app.use(session({ secret: 'test-openshift' }))

  .use(morgan('combined'))
  .use(function (req, res, next) {
    if (typeof (req.session.todolist) == 'undefined') {
      req.session.todolist = [];
    }
    next();
  });
app.get('/', function (req, res) {
  res.render('index.ejs');
})
  .use(function (req, res, next) {
    res.redirect('/');
  });

console.log("process.env.PORT: " + process.env.PORT);
console.log("process.env.OPENSHIFT_NODEJS_PORT:" + process.env.OPENSHIFT_NODEJS_PORT);
console.log("process.env.IP:" + process.env.IP);
console.log("process.env.OPENSHIFT_NODEJS_IP:" + process.env.OPENSHIFT_NODEJS_IP);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
console.log("Listening on "+ server_ip_address +", port: " + server_port);
app.listen(port, ip);