const express = require('express');
const app = express();
require('./db')
const port = 3000;
const ProducrRouter = require('./Routers/ProductsRouter');
const UserRouter = require('./Routers/UserRouter');
const OrderRouter = require('./Routers/OrderRouter');
app.use(express.json());

app.use('/users', UserRouter)
app.use('/products', ProducrRouter);
app.use('/orders' , OrderRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })