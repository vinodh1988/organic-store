var mongoose=require('mongoose');

var orders=mongoose.model('orders',new mongoose.Schema(
    {
      orderid: String,
      username: String,
      date: String,
      cart: Array
    }
),'orders');

module.exports=orders;