
const express = require("express");
const router = express.Router();

const userInfo = require("../viewModel/userInfo.js"); 
 

router.get('/',function(req, res, next){

    var params = {};

    for(var key in req.query){
        params[key] = req.query[key];
    } 

    userInfo.find(params,function(err,resData) {

        var data = resData;

        if(err){
            console.log('失败');
            console.log(err);
            data = err;
        }  

       userInfo.resJSON(res,data); 
    
    });

 
})

router.get("/save",function(req, res, next){


    

    userInfo.save({
        userName: "zpp",
        passWord: "zpp",
        age: 16,
        address: "shanghai",
        posi:"你猜",
    },function(err,resData){

        var data = resData;

        if(err){
            console.log('失败');
            console.log(err);
            data = err;
        }  

       userInfo.resJSON(res,data); 

    });

 


});

router.get("/delete",function(req, res, next){

    userInfo.remove({
        userName: "zpp"
    },function(err,resData){

        var data = resData;

        if(err){
            console.log('失败');
            console.log(err);
            data = err;
        }  

       userInfo.resJSON(res,data);


    }); 

});

router.get("/update",function(req, res, next){

    userInfo.update({
        userName: "zpp"
    },{
        userName: "zpp22"
    },function(err,resData){

        var data = resData;

        if(err){
            console.log('失败');
            console.log(err);
            data = err;
        }  

       userInfo.resJSON(res,data);


    }); 

});

exports = module.exports = router;