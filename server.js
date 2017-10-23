const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const textSearch = require('mongoose-text-search');
const PORT = 8000;

app.use(session({ secret: 'currentUser' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Client Imports
const path = require('path');
app.use(express.static(path.join(__dirname, '/public/dist')));

//Mongoose
var mongoose = require('./server/config/mongoose.js');

// Routes
var routes_setter = require('./server/config/routes.js');
routes_setter(app)
// Setting our Server to Listen on Port: 1337
app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
})
