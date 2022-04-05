const express = require('express');
const router = express.Router();
const checkauth = require('../Middleware/HandleAuthenticatedUser.middleware')

const { newOrder, GetOrders,OneOrder, deleteOrder } = require('../Controllers/OrderController');

router.post('/' ,checkauth, newOrder);
router.get('/' ,checkauth, GetOrders);
router.get("/:OrderId",checkauth , OneOrder);
router.delete("/:OrderId" ,checkauth, deleteOrder);

module.exports=router;