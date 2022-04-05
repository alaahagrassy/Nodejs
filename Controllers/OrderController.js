const express = require('express')
const Error = require('../Errors/Error')
const OrderModel = require ('../Models/OrdersModel');
const ProductModel = require('../Models/Products')

newOrder = async (req , res , next)=>{
    ProductModel.findById(req.body.ProductID)
    .then(Product=>{
        if(!Product){
            return res.status(404).json({
                message:"product Not Found"
            })
        }
        const order = new OrderModel({
            Product:req. body.ProductID,
            Quntity:req. body.quntity
            
        });
        order.save()
        .then(
            re=>{
                res.status(201).json(re);
            })
    })
    .catch(err=>{
        res.status(500).json({
            message:'Product not found',
            error:err
        })
    })
}

GetOrders = async (req , res , next)=>{
    // try{
    //     const AllOrders = await OrderModel.find();
    //     res.send({ AllOrders });
    
    //     }catch(error){  
    //         next(Error({code: "SERVER_ERROR", message: 'server error'}));
    
    //     }

        ////another way

        OrderModel.find()
        .populate('Product','name')
        .exec()
        .then(Orders=>{
            res.status(200).json(Orders)
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
    }

OneOrder = async (req, res)=>{
    OrderModel.findById(req.params.OrderId)
    .exec()
    .then(order=>{
        if(!order){
            return res.status(404).json({
                message:'Order not found'
            })
        }
        res.status(200).json(order)
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
} 

deleteOrder = async (req , res)=>{
    OrderModel.findByIdAndDelete(req.params.OrderId)
    .exec()
    .then(result=>{
        if(!result){
            return res.status(404).json({
                message:"Not Found"
            })
        }
        console.log(result);
        res.status(200).json({
            message:'Order Deleted'
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}



module.exports = {newOrder, GetOrders , OneOrder, deleteOrder} ;