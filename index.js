var express=require("express");
var app=express();
var parser=require('body-parser');
var path=require("path");

var uroutes=require("./routes/userroutes");
var products=require("./routes/productroutes");
var orders=require("./routes/orderroutes");
var messages =require("./routes/messageroutes");
var passport = require('passport');
var cors = require('cors')


app.use(cors())


app.use(parser.json());

var mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/organic');

var db = mongoose.connection;

app.get("/images/:imagename",function(request,response){
   let imagename = request.params.imagename;     
   response.sendFile(path.join(__dirname,"static-files/"+ imagename))
})

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("mongo db connection is open");
});



/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
  next();
});
*/

app.use(passport.initialize());


app.use("/users",uroutes);
app.use("/products",products);
app.use("/orders",orders);
app.use("/messages",messages);
app.listen(4500,function(){
    console.log("App is running in port number 4500");

});