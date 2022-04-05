const mongoose  = require("mongoose");

const {model}  = mongoose

const OrdersSchema = new mongoose.Schema({

    Product:{
        type: mongoose.Schema.Types.ObjectId,ref:'Product'},
    Quntity:{
        type:Number, 
        default: 1 
    }
})

const OrderModel = model('Order', OrdersSchema);

module.exports = OrderModel