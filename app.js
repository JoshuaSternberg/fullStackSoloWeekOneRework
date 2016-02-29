var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var data = require('./routes/data');




app.use(bodyParser.urlencoded({extended: true}));



app.use('/data', data);

app.get('/*', function(req, res) {
    console.log("Here is the request: " , req.params);
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public/', file));
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Server is ready on port ' + app.get('port'));
});



