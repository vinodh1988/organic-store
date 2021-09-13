var express = require('express');
var router = express.Router();
var  orders = require("../mongodb/schemas/orderschema");
const {sendMessage} = require('../queueservice/queueservice')


router.get("/all",function(request,response){
    orders.find({},{_id:0},function(err,data){
        if(err)
           response.status(500);
        else
           response.json(data);
    })
})

router.get("/all/:username",function(request,response){
    let username=request.params.username;
    orders.find({username:username},{_id:0},function(err,data){
        if(err)
           response.status(500);
        else
           response.json(data);
    })
})



router.post("/all",function(request,response){
    console.log(request.body)
    orders.insertMany(request.body,function(err,data){
        if(err)
           response.sendStatus(500);
        else{
            sendMessage("order-storage",request.body);
           response.json({status:"Success"});
        }
     });
 })

module.exports =router;