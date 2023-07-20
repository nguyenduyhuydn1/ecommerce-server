import asyncHandler from "express-async-handler";

import Coupon from "../model/Coupon.js";



// @desc    create New Coupon
// @route   POST /api/v1/Coupons
// @access  Private/Admin

export const createCouponCtrl = asyncHandler(async (req, res) => {
    const { code, startDate, endDate, discount } = req.body;
    if (isNaN(discount)) throw new Error('Discount must be a number');

    const couponExists = await Coupon.findOne({ code });
    if (couponExists) throw new Error('Coupon already exists');

    const coupon = await Coupon.create({
        startDate, endDate, discount,
        code: code.toUpperCase(),
        user: req.userAuthId
    });

    res.status(201).json({
        status: 'success',
        message: 'Coupon created successfully',
        coupon
    });
});



// @desc    Get All Coupon
// @route   GET /api/v1/Coupons
// @access  Private

export const getAllCouponCtrl = asyncHandler(async (req, res) => {
    let coupons = await Coupon.find();

    res.status(200).json({
        status: 'success',
        message: 'fetch Coupons successfully',
        coupons
    });
});



// @desc    Get Single Coupon 
// @route   GET /api/v1/Coupons:id
// @access  Private

export const getCouponIdCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const coupon = await Coupon.findById(id);
    if (!coupon) throw new Error('Coupon is not found');

    res.json({
        status: 'success',
        message: 'fetch Coupon Id successfully',
        coupon
    });
});


// @desc    Update Coupon
// @route   PUT /api/v1/Coupons:id
// @access  Private/Admin

export const updateCouponCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { code, startDate, endDate, discount } = req.body;

    const coupon = await Coupon.findByIdAndUpdate(id, {
        startDate, endDate, discount,
        code: code.toUpperCase()
    }, { new: true });
    if (!coupon) throw new Error('Coupon is not found');

    res.json({
        status: 'success',
        message: 'Coupon updated successfully',
        coupon
    });
});


// @desc    Delete Coupon
// @route   Delete /api/v1/Coupons:id
// @access  Private/Admin

export const deleteCouponCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) throw new Error('Coupon is not found');

    res.json({
        status: 'success',
        message: 'Coupon deleted successfully',
        coupon
    });
});
