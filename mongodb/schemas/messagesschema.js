var mongoose=require('mongoose');

var messages=mongoose.model('messages',new mongoose.Schema(
    {
      email: String,
      username: String,
      subject: String,
      message: String,
      to:{
        type:String,
        require:false
    }
    }
),'messages');

module.exports=messages;