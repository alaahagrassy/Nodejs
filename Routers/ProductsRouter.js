const express = require('express');
const router = express.Router();
const checkauth = require('../Middleware/HandleAuthenticatedUser.middleware')


const Controllers = require('../Controllers/ProductController');

router.post('/' , Controllers.addProduct)

router.get('/' , Controllers.getProduct)
router.get('/:id' , Controllers.getProductByID)
router.delete('/:id',checkauth, Controllers.DeleteProduct)
router.patch('/:id' ,checkauth, Controllers.UpdatePdoduct)

module.exports = router