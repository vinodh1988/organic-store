var express = require('express');
var router = express.Router();
var  messages = require("../mongodb/schemas/messagesschema");
var mailer =require("../config/mailservice")
const {sendMessage} = require('../queueservice/queueservice')

router.get("/all",function(request,response){
    messages.find({},{_id:0},function(err,data){
        if(err)
           response.status(500);
        else
           response.json(data);
    })
})

router.get("/all/:username",function(request,response){
    let username=request.params.username;
    messages.find({username:username},{_id:0},function(err,data){
        if(err)
           response.status(500);
        else
           response.json(data);
    })
})

router.get("/received/:username",function(request,response){
    let username=request.params.username;
    messages.find({to:username},{_id:0},function(err,data){
        if(err)
           response.status(500);
        else
           response.json(data);
    })
})


router.post("/all",function(request,response){
    console.log(request.body)
    messages.insertMany(request.body,function(err,data){
        if(err)
           response.sendStatus(500);
        else{
           // mailer(request.body.email,request.body.subject,request.body.message)
           sendMessage("queue-store-55",request.body);
            console.log(data)
           response.json({status:"Success"});
        }
     });
 })

module.exports =router;