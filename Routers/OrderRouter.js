const express = require('express');
const router = express.Router();
const checkauth = require('../Middleware/HandleAuthenticatedUser.middleware')

const { newOrder, GetOrders,OneOrder, deleteOrder, confrimOrder,deleteallorders} = require('../Controllers/OrderController');

router.post('/' ,checkauth, newOrder);
router.get('/' , GetOrders);
router.get("/:OrderId" , OneOrder);
router.delete("/:OrderId", deleteOrder);
router.delete("/" , deleteallorders);
router.patch('/:id', confrimOrder)


module.exports=router;