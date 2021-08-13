const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const { isAuth, isAdmin, isSellerOrAdmin } = require('../util.js');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const orderRouter = express.Router();

orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({ user: req.user._id });
       if(orders){
           res.send(orders);
       }else{
           res.status(404).message('không tìm thấy');
       }
    })
);

orderRouter.get(
    '/',
    isAuth,
    // isSellerOrAdmin,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({}).populate('user', 'name');
        // const seller = req.query.seller || '';
        // const sellerFilter = seller ? { seller } : {};
        // const orders = await Order.find({ ...sellerFilter }).populate(
        //     'user',
        //     'name'
        // );
        res.send(orders);
    })
)
orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).send({ message: 'cart is empty' });
        } else {
            const order = new Order({
                // seller: req.body.orderItems[0].seller,
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id
            });
            const createdOrder = await order.save();
            res.status(201).send({ message: 'New Order Created', order: createdOrder });
        }
    }));
orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: "order not found" });
        }
    })
)
orderRouter.put(
    '/:id/pay', isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            }
            const updatedOrder = await order.save();
            res.send({ message: 'Order paid', order: updatedOrder });
        } else {
            res.status(404).send({ message: 'Order not Found' });
        }
    })
)
orderRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            const deleteOrder = await order.remove();
            res.send({ message: 'Order Delete', order: deleteOrder });
        } else {
            res.status(404).send({ message: 'Order not fount' });
        }
    })
)
orderRouter.put(
    '/:id/deliver',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.send({ message: 'Order Deliver', order: updatedOrder });

        } else {
            res.status(404).send({ message: 'Order not Found' });
        }
    })
)

orderRouter.get(
    '/summary',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    numOrders: { $sum: 1 },
                    totalSales: { $sum: '$totalPrice' },
                },
            },
        ]);
        const users = await User.aggregate([
            {
                $group: {
                    _id: null,
                    numUsers: { $sum: 1 },
                },
            },
        ]);
        const dailyOrders = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    orders: { $sum: 1 },
                    sales: { $sum: '$totalPrice' },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const productCategories = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
        ]);
        res.send({ users, orders, dailyOrders, productCategories });
    })
);

module.exports = orderRouter;