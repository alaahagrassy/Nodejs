const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkauth = require('../Middleware/HandleAuthenticatedUser.middleware')


const Controllers = require('../Controllers/ProductController');


const storage =multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads/');
    },
    filename:function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
}) 

const upload = multer({storage: storage});

router.post('/' , upload.single('productImage'),Controllers.addProduct)

router.get('/' , Controllers.getProduct)
router.get('/:id' , Controllers.getProductByID)
router.delete('/:id',checkauth, Controllers.DeleteProduct)
router.patch('/:id' ,checkauth, Controllers.UpdatePdoduct)

module.exports = router