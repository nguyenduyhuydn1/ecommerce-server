import asyncHandler from "express-async-handler";

import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";



// @desc    create New Order
// @route   POST /api/v1/Order
// @access  Private/Admin

export const createOrderCtrl = asyncHandler(async (req, res) => {
    const { shippingAddress, orderItems, totalPrice } = req.body;
    if (orderItems.length <= 0) throw new Error('No Order Item');

    const user = await User.findById(req.userAuthId);
    if (!user.hasShippingAddress) throw new Error('please provide shipping address');

    const order = await Order.create({
        shippingAddress,
        orderItems,
        totalPrice,
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



// @desc    Get All Order
// @route   GET /api/v1/Order
// @access  Public

export const getAllOrderCtrl = asyncHandler(async (req, res) => {
    let Order = await Order.find();

    res.json({
        status: 'success',
        message: 'fetch Order successfully',
        Order
    });
});



// @desc    Get Single Order 
// @route   GET /api/v1/Order:id
// @access  Public

export const getOrderIdCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const Order = await Order.findById(id);
    if (!Order) throw new Error('Order is not found');

    res.json({
        status: 'success',
        message: 'fetch Order Id successfully',
        Order
    });
});


// @desc    Update Order 
// @route   PUT /api/v1/Order:id
// @access  Private/Admin

export const updateOrderCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const Order = await Order.findByIdAndUpdate(id, { name: name.toLowerCase() }, { new: true });
    if (!Order) throw new Error('Order is not found');

    res.json({
        status: 'success',
        message: 'Order updated successfully',
        Order
    });
});


// @desc    Delete Order 
// @route   Delete /api/v1/Order:id
// @access  Private/Admin

export const deleteOrderCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const Order = await Order.findByIdAndDelete(id);
    if (!Order) throw new Error('Order is not found');

    res.json({
        status: 'success',
        message: 'Order deleted successfully',
        Order
    });
});
