var express = require('express')
var app = express();



app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

var livereload = require('livereload');
// 
// require('./public/js/expert_api');
// require('./public/js/expert_init');
// require('./public/js/login');
// require('./public/js/seller_api');
// require('./public/js/user_api');
// require('./public/js/user_init');
// require('./public/js/user');

// This is different form http.createServer() or app.createServer()
var reloadServer = livereload.createServer();

reloadServer.watch([__dirname + "/public/css", __dirname + "/public/js", __dirname + "/views"]);


app.get('/', function (req, res)
{
    res.render('index.html');
});

app.get('/user', function (req, res)
{
    res.render('user.html');
});

app.get('/seller', function (req, res)
{
    res.render('seller.html');
});

app.get('/expert', function (req, res)
{
    res.render('expert.html');
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})


// npm install livereload --save
