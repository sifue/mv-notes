(function(){
  'use strict';
  // Configure
  var conString = (process.env.DATABASE_URL || "postgres://postgres:postgres@localhost/postgres"); // if you wanna locally run, edit.
  var allowOrigin = 'http://sifue.github.io';  //!! Edit for your tkool application
    
  var express = require('express');
  var app = express();
  var pg = require('pg');
  app.set('port', (process.env.PORT || 5000));
  app.use(express.static(__dirname + '/public'));

  
  // GET
  app.get('/', function(req, res) {
    res.send('mv-notes working.');
  });
  
  app.get('/notes/:note_name/posts', function(req, res) {
    let noteName = req.params.note_name;
    let client = new pg.Client(conString);
    res.contentType('json');
    res.header('Access-Control-Allow-Origin', allowOrigin);
    client.connect(function (err) {
      if (err) {
        return console.error('could not connect to postgres', err);
      }
      client.query(
        'select post_id, note_name, created_at, data from posts where note_name = $1 order by created_at desc limit 5',
        [noteName],
        function (err, result) {
          if (err) {
            return console.error('error running query', err);
          }
          client.end();
          res.json(result.rows);
        });
    });
  });
  
  // POST
  var bodyParser = require('body-parser');
  app.use(bodyParser.json()); // for parsing application/json
  app.post('/notes/:note_name/posts', function(req, res) {
    res.header('Access-Control-Allow-Origin', allowOrigin);
    let noteName = req.params.note_name;
    let client = new pg.Client(conString);
    client.connect(function (err) {
      if (err) {
        return console.error('could not connect to postgres', err);
      }
      // delete for heroku free limitation.
      client.query(
        'delete from posts where post_id in (select post_id from posts order by post_id desc offset 9999 limit 1);',
        function (err, result) {
          if (err) {
            return console.error('error running post delete query', err);
          }
        });
      
      // insert
      client.query(
        'insert into posts(note_name, created_at, data) values ($1, current_timestamp, $2)',
        [noteName, JSON.stringify(req.body)],
        function (err, result) {
          if (err) {
            return console.error('error running post insert query', err);
          }
          client.end();
        });
    });
    res.json(['Post inserted to noteName' + noteName]);
  });
  
  // Start
  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
})();