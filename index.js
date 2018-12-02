const express = require('express')
const app = express() 


app.get('/page/index**', (req, res) => res.sendFile(__dirname + "\/server\/tpl\/index.html"));

app.use('/static', express.static(__dirname + '/static'));

app.use(express.static(__dirname + '/static'));



app.listen(80, () => console.log('Example app listening on port 80!'));