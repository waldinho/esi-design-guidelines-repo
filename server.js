var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/esiModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/esi-design-guidelines');
mongoose.connect('mongodb://heroku_6wx55zm6:1al4imgn4bhuj712lf4mrek6ve@ds149132.mlab.com:49132/heroku_6wx55zm6');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/esiRoute');
routes(app);


app.listen(port);

console.log('RESTful API server port: ' + port);

app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});