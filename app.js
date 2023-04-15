//const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
//const errorhandler = require('./utils/errorhandler');
const order = require('./routes/orderroutes');
const cookieParser = require('cookie-parser');
app.use(express.json());

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
//route imports
const product =  require("./routes/productRoute")
app.use('/api/v1',product);
const userRoutes = require('./routes/userroutes');
app.use('/api/v1', userRoutes);
const adminRoutes = require('./routes/adminroutes');
app.use('/api/v1', adminRoutes);
const orderRoutes = require('./routes/orderroutes');
app.use('/api/v1', orderRoutes);
const cartRoutes = require('./routes/cartroutes');
app.use('/api/v1', cartRoutes);
module.exports= app;
//Middleware for eror
app.use(errorMiddleware);
//app.use(errorhandler);
// configure env file
dotenv.config({path: './config.env'});
require('./db/conn');

/*app.get('/',(req, res)=>{
    res.send("Hello world");
})*/
app.get('/message',(req, res)=>{
    res.json({message:"Hello world"});
});
// Run Server
app.listen(5000, ()=>{
    console.log("Server is listening");
})