(function(){
  'use strict';
  var express = require('express');
  var app = express();
  var pg = require('pg');
  var conString = (process.env.DATABASE_URL || "postgres://postgres:postgres@localhost/postgres");
  
  app.set('port', (process.env.PORT || 5000));
  app.use(express.static(__dirname + '/public'));
  
  app.get('/', function(req, res) {
    res.send('mv-notes working.');
  });
  
  app.get('/notes/:note_name/posts', function(req, res) {
    let noteName = req.params.note_name;
    let client = new pg.Client(conString);
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
  
  app.post('/notes/:note_name/posts', function(req, res) {    
    let noteName = req.params.note_name;
    let client = new pg.Client(conString);
    client.connect(function (err) {
      if (err) {
        return console.error('could not connect to postgres', err);
      }
      let now = new Date();
      let json = JSON.parse(req.body);
      client.query(
        'insert into posts(note_name, created_at, data) values ($1, $2, $3)',
        [noteName, now, JSON.stringify(json)],
        function (err, result) {
          if (err) {
            return console.error('error running query', err);
          }
          client.end();
          res.json(result.rows);
        });
    });
    
    res.json(['mv-notes working. noteName:' + noteName]);
  });
  
  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
})();

