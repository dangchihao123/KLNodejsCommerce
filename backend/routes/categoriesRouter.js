const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Category = require('../models/categoriesModel');
const data = require('../data');

const categoryRouter = express.Router();

categoryRouter.get(
    '/seed',
    expressAsyncHandler(async(req, res)=>{
        const createCategories = await Category.insertMany(data.categories);
        res.send({createCategories});
    })
    );
categoryRouter.get(
    '/',
    expressAsyncHandler(async(req, res)=>{
        const categories = await Category.find({});
        res.send({categories});
    })
    );
    module.exports = categoryRouter;