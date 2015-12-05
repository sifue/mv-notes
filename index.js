(function(){
  'use strict';

  var express = require('express');
  var app = express();
  
  app.set('port', (process.env.PORT || 5000));
  
  app.use(express.static(__dirname + '/public'));
  
  
  app.get('/', function(req, res) {
    res.send('mv-notes working.');
  });
  
  app.get('/notes/:note_name/posts', function(req, res) {
    console.log(req.params);
    let noteName = req.params.note_name;
    res.send('mv-notes working. noteName:' + noteName);
    res.json();
  });
  
  app.post('/notes/:note_name/posts', function(req, res) {
    console.log(req.params);
    let noteName = req.params.note_name;
    res.send('mv-notes working. noteName:' + noteName);
    res.json();
  });
  
  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });

})();

