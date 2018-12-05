'use strict';
const express = require('express')
const path = require("path");
const app = express()

const cookieParser = require('cookie-parser')
const config= require('config-lite')(__dirname);
const connectMongo = require('connect-mongo')
const session = require('express-session')
const bodyParser = require('body-parser')
const router = require("./routes/index.js");



app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'ejs');
app.engine("html", require("ejs").__express);
app.set('view engine', 'html');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const MongoStore = connectMongo(session);

app.use(cookieParser());


app.use(session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    rolling:true,
    saveUninitialized: false,
    cookie: config.session.cookie, 
    //将session存进数据库  用来解决负载均衡的问题
    store: new MongoStore({
        url: config.url,
        touchAfter:24*3600
    })
}))


app.all('*', (req, res, next) => {
	const {
		origin,
		Origin,
		referer,
		Referer
	} = req.headers;
	const allowOrigin = origin || Origin || referer || Referer || '*';
	res.header("Access-Control-Allow-Origin", allowOrigin);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", 'Express');
	if (req.method == 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
});


app.get('/page/index**', (req, res) => res.render('index', {
    title: "我的页面" 
}));


router(app);


app.use('/static', express.static(__dirname + '/static'));

app.use(express.static(__dirname + '/static'));


app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(80, () => console.log('Example app listening on port 80!'));