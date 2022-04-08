const express = require('express');
const app = express();
require('./db')
var cors = require('cors')
const port = 3000;
const ProducrRouter = require('./Routers/ProductsRouter');
const UserRouter = require('./Routers/UserRouter');
const OrderRouter = require('./Routers/OrderRouter');
const CartRouter=require('./Routers/CartRouter');
app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'));
app.use('/users', UserRouter)
app.use('/products', ProducrRouter);
app.use('/orders' , OrderRouter);
app.use('/carts',CartRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })