const express = require('express')
const app = express() 


app.get('/page/index**', (req, res) => res.sendFile(__dirname + "\/tpl\/index.html"));

app.use(express.static('../static'));



app.listen(80, () => console.log('Example app listening on port 80!'));