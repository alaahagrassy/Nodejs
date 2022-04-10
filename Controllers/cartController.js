const express = require('express');
const { result } = require('lodash');
const Error = require('../Errors/Error');
const cartModel = require('../Models/cartsModel');
const ProductModel = require('../Models/Products')
const UserModel = require('../Models/UserModel')

newOrderfromcart = async (req, res, next) => {
    ProductModel.findById(req.body.ProductID)
        .then(Product => {
            if (!Product) {
                return res.status(404).json({
                    message: "product Not Found"
                })
            }
            const order = new cartModel({
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

GetOrdersfromcart = async (req, res, next) => {
    cartModel.find()
        .populate('Product', 'name')
        .populate('userId', 'email')
        .exec()
        .then(cart => {
            res.status(200).json(cart)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

OneOrderfromcart = async (req, res) => {
    cartModel.findById(req.params.cartId)
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

deleteOrderfromcart = async (req, res) => {
    cartModel.findByIdAndDelete(req.params.cartId)
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "Not Found"
                })
            }
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
removeallromcart = async (req, res, next) => {
    const { userId } = req.body;
     const finduser= cartModel.find({userId})
    cartModel.deleteMany(finduser)
        .then(result => {
            res.status(200).json({
                message: 'Deleted'
            })
        })
      
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}



module.exports = { newOrderfromcart, GetOrdersfromcart, OneOrderfromcart, deleteOrderfromcart, removeallromcart };