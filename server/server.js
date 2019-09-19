var express = require('express');
var path = require('path');
const routes = require("./routes");

var app = express();
var PORT = process.env.PORT || 3001;

// Sets up static folder
app.use(express.static(path.join(__dirname,'../client/build')))

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Server Test Route
app.use(routes);
app.get("*", (req,res)=>res.json("server works"));


app.listen(PORT,()=>console.log(`Listening on port: ${PORT}`));