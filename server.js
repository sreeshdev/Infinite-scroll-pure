var express = require("express");
var app = express();
var path = require("path");


app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(8080, () => console.log("Server is Running... Open Browser @ http://localhost:8080"));
