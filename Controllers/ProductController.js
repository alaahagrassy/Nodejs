const express =require('express')
const Error = require('../Errors/Error')
const ProductModel = require ('../Models/Products');
require('dotenv').config
addProduct = async (req , res,next)=>{
    const product = new ProductModel({
        name:req.body.name,
        price:req.body.price,
        description: req.body.description,
        productImage: req.file.path
    });
    product.save()
    .then(result=>{
        res.status(201).json({
            message:"created product successfully",
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}

getProduct = async (req , res)=>{
    try{
    const AllProduct = await ProductModel.find();
    res.send({ AllProduct });

    }catch(error){  
        next(Error({code: "SERVER_ERROR", message: 'server error'}));

    }
}
getProductByID = async (req , res,next)=>{
    const {id} = req.params;
    try{
        const ProductById = await ProductModel.findById(id);
        res.send(ProductById);

    }catch(error){  
        next(Error({code: "SERVER_ERROR", message: 'server error'}));

    }
}

DeleteProduct = async (req , res, next)=>{
    const {id} = req.params;
    ProductModel.findByIdAndDelete(id)
    .exec()
    .then(result=>{
        if(!result){
            return res.status(404).json({
                message:"Not Found"
            })
        }
        res.status(200).json({
            message:'product Deleted'
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}

UpdatePdoduct = async (req , res , next)=>{
    const {id} = req.params;
    const { body :{ name , price , description}}= req;
    try{
        const UpdateProduct = await ProductModel.findByIdAndUpdate(id , {
           name , price , description
       },{
           upsert :true
       });
       res.send(UpdateProduct)

    }catch(error){  
        next(Error({code: "SERVER_ERROR", message: 'server error'}));
    }
}


module.exports = { addProduct , getProduct ,getProductByID , DeleteProduct,UpdatePdoduct }