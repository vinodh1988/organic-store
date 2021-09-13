var mongoose=require('mongoose');

var products=mongoose.model('products',new mongoose.Schema(
    {
      id: Number,
      name: String,
      type: String,
      description: String,
      qty: String,
      image: String,
      price: Number
    }
),'products');

module.exports=products;