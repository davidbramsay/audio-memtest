const express        = require('express');
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');
const db             = require('./db_schema');
const app            = express();

const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 
  'mongodb://localhost/audio-memtest';

const mongoOptions = { db: { safe: true }};

mongoose.Promise = global.Promise;

mongoose.connect(uristring, mongoOptions, function (err, res) {
  if (err) { console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else { console.log ('Successfully connected to: ' + uristring); }
});

require('./app/routes')(app, db);

app.listen(port, () => {
console.log('We are live on ' + port);
});


