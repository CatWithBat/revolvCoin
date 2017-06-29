
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
var port = process.env.PORT || 8082;



// config files
var db = require('./config/db');
//
mongoose.connect(db.url, { useMongoClient: true });

var multer = require('multer');
var upload = multer();
app.use(upload.array());

// app.use(multer({ dest: '/tmp/'}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
require('./app/routes')(app);
////////////////////////////////////////////////////////////////////////////////
////////////////////////Initialize/Spin up the Server////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var server = app.listen(port, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})


exports = module.exports = app;
