var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  // ejs render automatically looks in the views folder

  res.render('index');
});

app.get('/:Qpath', (req, res) => {
  var id = req.params.Qpath;

  id = id.replace(/%20|\+|\//g, '');

  var re = /January|Febuary|March|April|May|June|July|August|September|October|November|December/i;

  var month = id.match(re);

  id = id.replace(re, "");

  var date = month + " " + id.slice(0, 3) + ", " + id.slice(4, 9);

  var myDate = new Date(date);
  var unix = myDate.getTime();


  var timestamp

  if (!isNaN(unix))
    timestamp = {
      "unix": unix,
      "natural": date
    }
  else
    timestamp = {
      "unix": null,
      "natural": null
    }


  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify(timestamp));

});

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});
