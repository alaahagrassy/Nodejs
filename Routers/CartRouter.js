const express = require('express');
const router = express.Router();
const checkauth = require('../Middleware/HandleAuthenticatedUser.middleware')

const { newOrderfromcart, GetOrdersfromcart,OneOrderfromcart, deleteOrderfromcart } = require('../Controllers/cartController')

router.post('/' ,checkauth, newOrderfromcart);
router.get('/' ,checkauth, GetOrdersfromcart);
router.get("/:cartId",checkauth , OneOrderfromcart);
router.delete("/:cartId" ,checkauth, deleteOrderfromcart);

module.exports=router;