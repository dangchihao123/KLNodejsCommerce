const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const data = require('../data');
const { isAdmin, isAuth, isSellerOrAdmin } = require('../util.js');

const productRouter = express.Router();

productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'Bạn đã gửi một nhận xét ' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);


productRouter.put(
  '/:id',
  isAuth,
  // isSellerOrAdmin,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {

      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);


productRouter.post(
  '/',
  isAuth,
  // isSellerOrAdmin,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: '',
      // seller: req.user._id,
      image: '/images/p1.jpg',
      price: req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
  })
);

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
  const createProducts = await Product.insertMany(data.products);
  res.send({ createProducts });
})
)
productRouter.get('/', expressAsyncHandler(async (req, res) => {
  
  // const seller = req.query.seller || '';
  // const sellerFilter = seller ? { seller } : {};
  // const products = await Product.find({ ...sellerFilter });
  const category = req.query.category || '';
  const categoryFilter = category ? { category } : {};
  const products = await Product.find({
    ...categoryFilter,
  });
  if (products) {
    res.send(products);
  } else {
    console.log('products not found');
  }
})
)
productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);



productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ massage: "Product not found" });
  }
})
)


module.exports = productRouter;


