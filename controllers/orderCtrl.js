import asyncHandler from "express-async-handler";

import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Coupon from "../model/Coupon.js";
import { createCharges, createCustomer } from "../services/stripe.js";




export const test = asyncHandler(async (req, res) => {
    let a = await createCustomer("xxxxxxxxxxxx@gmail.com", "xxxxxxxxxxxx");

    let b = await createCharges('', a.customer.id);
    createCharges;
    res.json({
        status: "ok",
        check: a,
        check2: b
    });
});



// @desc    create New Order
// @route   POST /api/v1/Order
// @access  Private/Admin

export const createOrderCtrl = asyncHandler(async (req, res) => {
    const { coupon } = req.query;
    let couponFound;
    let discount;
    if (coupon) {
        couponFound = await Coupon.findOne({ code: code.toUpperCase() });
        if (!couponFound) throw new Error('Coupon is not exists');
        if (couponFound.isExpired) throw new Error('Coupon is expired');
        discount = couponFound.discount / 100;
    }


    const { shippingAddress, orderItems, totalPrice } = req.body;
    if (orderItems.length <= 0) throw new Error('No Order Item');

    const user = await User.findById(req.userAuthId);
    if (!user.hasShippingAddress) throw new Error('please provide shipping address');

    const order = await Order.create({
        shippingAddress,
        orderItems,
        totalPrice: couponFound ? (totalPrice - totalPrice * discount) : totalPrice,
        user: user._id
    });

    //handle quantity sold
    const products = await Product.find({ _id: { $in: orderItems } });
    if (products.length <= 0) throw new Error('item is not found, please check your item');

    let product;
    let checkOutOfStock = { "valid": true };
    orderItems.map(async (order) => {
        product = products.find((product) => product._id.toString() === order._id.toString());
        if (product) {
            if (product.totalQty -= order.qty <= 0) {
                checkOutOfStock._id = product._id;
                checkOutOfStock.valid = false;
            }
            product.totalSold += order.qty;
            product.totalQty -= order.qty;
        }
    });
    if (!checkOutOfStock.valid) throw new Error('Out of Sock');
    await product.save();

    //push order
    user.orders.push(order._id);
    await user.save();

    res.json({
        status: 'success',
        message: 'Order created successfully',
        order,
    });
});



// // @desc    Get All Order
// // @route   GET /api/v1/Order
// // @access  Public

// export const getAllOrderCtrl = asyncHandler(async (req, res) => {
//     let order = await Order.find();

//     res.json({
//         status: 'success',
//         message: 'fetch Order successfully',
//         order
//     });
// });



// // @desc    Get Single Order 
// // @route   GET /api/v1/Order:id
// // @access  Public

// export const getOrderIdCtrl = asyncHandler(async (req, res) => {
//     const { id } = req.params;

//     const order = await Order.findById(id);
//     if (!order) throw new Error('Order is not found');

//     res.json({
//         status: 'success',
//         message: 'fetch Order Id successfully',
//         order
//     });
// });


// // @desc    Update Order 
// // @route   PUT /api/v1/Order:id
// // @access  Private/Admin

// export const updateOrderCtrl = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;

//     const order = await Order.findByIdAndUpdate(id, { name: name.toLowerCase() }, { new: true });
//     if (!order) throw new Error('Order is not found');

//     res.json({
//         status: 'success',
//         message: 'Order updated successfully',
//         order
//     });
// });


// @desc    Delete Order 
// @route   Delete /api/v1/Order:id
// @access  Private/Admin

// export const deleteOrderCtrl = asyncHandler(async (req, res) => {
//     const { id } = req.params;

//     const order = await Order.findByIdAndDelete(id);
//     if (!order) throw new Error('Order is not found');

//     res.json({
//         status: 'success',
//         message: 'Order deleted successfully',
//         order
//     });
// });





// @desc    Get sales sum of orders 
// @route   Delete /api/v1/Order/sales
// @access  Private/Admin

export const getOrderStatsCtrl = asyncHandler(async (req, res) => {
    //get order stats
    const orders = await Order.aggregate([{
        $group: {
            _id: null,
            minimumSale: {
                $min: "$totalPrice",
            },
            totalSales: {
                $sum: "$totalPrice",
            },
            maxSale: {
                $max: "$totalPrice",
            },
            avgSale: {
                $avg: "$totalPrice",
            },
        },
    }]);

    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const saleToday = await Order.aggregate([{
        $match: {
            createdAt: {
                $gte: today,
            },
        },
    },
    {
        $group: {
            _id: null,
            totalSales: {
                $sum: "$totalPrice",
            },
        },
    }]);

    res.status(200).json({
        status: 'success',
        message: 'fetch sales successfully',
        orders
    });
});
