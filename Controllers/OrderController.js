const express = require('express')
const Error = require('../Errors/Error');
const cartModel = require('../Models/cartsModel');
const OrderModel = require('../Models/OrdersModel');
const ProductModel = require('../Models/Products')

newOrder = async (req, res, next) => {
    ProductModel.findById(req.body.ProductID)
        .then(Product => {
            if (!Product) {
                return res.status(404).json({
                    message: "product Not Found"
                })
            }
            const order = new OrderModel({
                Product: req.body.ProductID,
                Quntity: req.body.quntity,
                userId: req.userId
            });
            order.save()
                .then(
                    re => {
                        res.status(201).json(re);
                    })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Product not found',
                error: err
            })
        })
}

confrimOrder = async (req, res, next) => {
    const { id } = req.params;
    const { body: { status } } = req;
    try {
        const updateOrder = await OrderModel.findByIdAndUpdate(id, {
            status
        }
        );
        res.status(200).json({
            message: "Updated successfully"
        })
    } catch (error) {
        next(Error({ code: "SERVER_ERROR", message: 'server error' }));
    }
}

GetOrders = async (req, res, next) => {
    // try{
    //     const AllOrders = await OrderModel.find();
    //     res.send({ AllOrders });

    //     }catch(error){  
    //         next(Error({code: "SERVER_ERROR", message: 'server error'}));

    //     }

    ////another way

    OrderModel.find()
        .populate('Product', 'name')
        .populate('userId', 'email' )
        .exec()
        .then(Orders => {
            res.status(200).json(Orders)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

OneOrder = async (req, res) => {
    OrderModel.findById(req.params.OrderId)
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: 'Order not found'
                })
            }
            res.status(200).json(order)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

deleteOrder = async (req, res) => {
    OrderModel.findByIdAndDelete(req.params.OrderId)
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "Not Found"
                })
            }
            console.log(result);
            res.status(200).json({
                message: 'Order Deleted'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}
deleteallorders = async(req , res ,next)=>{
    OrderModel.deleteMany()
    .then(result=>{
        res.status(200).json({
            message:'All Deleted'
        })
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}



module.exports = { newOrder, GetOrders, OneOrder, deleteOrder, confrimOrder,deleteallorders };