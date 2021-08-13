const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Tinh = require('../models/tinhModel');
const data = require('../data');

const tinhRouter = express.Router();

tinhRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createTinh = await Tinh.insertMany(data.tinh);
    res.send({ createTinh });
}));
tinhRouter.get('/', expressAsyncHandler(async(req, res)=>{
    const tinh = await Tinh.find({});
    // res.send(tinh);
    if(tinh){
        res.send(tinh);
    }else{
        console.log('tinh not found');
    }
}))
module.exports = tinhRouter;