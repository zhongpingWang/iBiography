
const express = require("express");
const router = express.Router();

router.get('/',function(req, res, next){
    res.writeHead(200,{"Content-Type":'application/json','charset':'utf-8'});
    res.write(JSON.stringify({name:1234}));
    res.end();
})

exports = module.exports = router;