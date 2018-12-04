'use strict';
const express = require('express')
const path = require("path");
const app = express()

const cookieParser = require('cookie-parser')
const config = require('config-lite')(__dirname);
const connectMongo = require('connect-mongo')
const session = require('express-session')
const bodyParser = require('body-parser')
//const router = require("./routes/index.js");



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
    rolling: true,
    saveUninitialized: false,
    cookie: config.session.cookie,
    //将session存进数据库  用来解决负载均衡的问题
    store: new MongoStore({
        url: config.url,
        touchAfter: 24 * 3600
    })
}))

app.get('/page/index**', (req, res) => res.render('index', {
    title: "我的页面"
}));


//引包
var mongoose = require('mongoose');
//连接数据库，数据库叫做/studentmanagement。如果数据库不存在会自动创建。
mongoose.connect('mongodb://localhost:27017/iBiography');

 //创建一个schema
 var studentSchema = {
    "name": String,
    "age": Number,
    "sex": String
};
//创建一个模型（就是一个类）
var Student = mongoose.model("student", studentSchema);

app.get('/init', function (req, res) {
    console.log(123);
   
    //new一个实例
    var xiaoming = new Student({
        "name": "小明",
        "age": 12,
        "sex": "男"
    });
    //持久化
    xiaoming.save();

    res.render('index', {
        title: "我的页面"
    });

    // Student.find({"age" : {$gt : 12}},function(err,docs){
    //     console.log(docs);
    // });

    // Student.remove({"name" : "小明"},function(err){
    
    // });

    // Student.find({"name" : "小红"} , function(err,docs){
    //     var xiaohong = docs[0];
    //     xiaohong.remove();
    // });

    // Student.find({"name" : "小强"} , function(err,docs){
    //     var xq = docs[0];
    //     xq.sex = "女";
    //     xq.save();
    // });
});

//router(app);


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