var express = require('express');
var path =require ('path');
var router = express.Router();
var  products = require("../mongodb/schemas/products");
var multer  = require('multer')
//var upload = multer({ dest: path.join(__dirname,"../static-files")})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"../static-files"))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
   
  var upload = multer({ storage: storage })

router.get("/all",function(request,response){
    products.find({},{_id:0},function(err,data){
        if(err)
           response.status(500);
        else
           response.json(data);
    })
})


router.get("/all/:pattern",function(request,response){
    let pattern=request.params.pattern;
    products.find({type:pattern},{_id:0},function(err,data){
        if(err)
           response.sendStatus(500);
        else
           response.json(data);
     });
 })

 router.post("/all",function(request,response){
    console.log(request.body)
    products.insertMany(request.body,function(err,data){
        if(err)
           response.sendStatus(500);
        else{
            console.log(data)
           response.json({status:"Success"});
        }
     });
 })

 router.post('/add', upload.single('imagename'), function (req, res, next) {
  // req.file is tupdahe `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file)
     try{
        let obj ={id: Math.random()*10000, name: req.body.name, 
            type:req.body.type,description:req.body.description,
            qty:req.body.qty,image:req.file.originalname,price:req.body.price}  
            products.insertMany(obj,function(err,data){
                if(err)
                   res.sendStatus(500);
                else{
                    console.log(data)
                   res.json({status:"Success"});
                }
             });
      
     }
     catch(e){
          console.log(e)
         res.status(500)
     }
})


router.post('/update', upload.single('imagename'), function (req, res, next) {
   // req.file is the `avatar` file
   // req.body will hold the text fields, if there were any
   console.log(req.file)
      try{
         let obj ={ name: req.body.name, 
             type:req.body.type,description:req.body.description,
             qty:req.body.qty,price:req.body.price}  
             console.log(req.file)
             console.log(obj)
             console.log(req.body.id)
             console.log(obj.id)
             if(req.file!=undefined)
             obj={...obj,image: req.file.originalname}
             console.log(obj)
             products.updateMany({id:req.body.id},obj,function(err,data){
                 if(err)
                    res.sendStatus(500);
                 else{
                     console.log(data)
                    res.json({status:"Success"});
                 }
              });
       
      }
      catch(e){
           console.log(e)
          res.status(500)
      }
 })

 router.delete('/remove/:id', function (req, res, next) {
   // req.file is the `avatar` file
   // req.body will hold the text fields, if there were any
  
      try{
             console.log({id:req.params.id})
             products.deleteOne({id:req.params.id},function(err,data){
                 if(err)
                    res.sendStatus(500);
                 else{
                     console.log(data)
                    res.json({status:"Success"});
                 }
              });
       
      }
      catch(e){
           console.log(e)
          res.status(500)
      }
 })
 

module.exports =router;

