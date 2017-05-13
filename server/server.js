var express = require('express');
var bodyParser = require('body-parser');
var handlers = require('./handlers.js')
var port = 8000;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));


app.post('/api/users/signin', handlers.signin);
app.post('/api/users/signup', handlers.signup);

app.post('/api/orders', handlers.addOrder);

app.get('/api/orders/:username', handlers.getCookerOrders);

app.get('/api/users/:username', handlers.getCookerProfile);
app.get('/api/cookingNames', handlers.getCookingNames);
app.get('/api/todayCookings', handlers.getTodayCookings);
app.get('/api/topCookers', handlers.getTopCookers);


app.listen(process.env.PORT || port);