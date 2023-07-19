import asyncHandler from "express-async-handler";

import Review from "../model/Review.js";
import Product from "../model/Product.js";



// @desc    create new Review
// @route   POST /api/v1/Review
// @access  Private/Admin

export const createReviewCtrl = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { message, rating } = req.body;

    const productFound = await Product.findById(productId).populate('reviews');
    if (!productFound) throw new Error('product is not found');

    const hasReviewed = productFound.reviews.find(review => review?.user.toString() == req.userAuthId.toString());
    if (hasReviewed) throw new Error('you have already reviewed this product');

    const review = await Review.create({
        message,
        rating,
        product: productFound._id,
        user: req.userAuthId,
    });

    productFound.reviews.push(review._id);
    await productFound.save();

    res.status(201).json({
        status: 'success',
        message: 'Review created successfully',
    });
});



// // @desc    Get All Review
// // @route   GET /api/v1/Review
// // @access  Public

export const getAllReviewCtrl = asyncHandler(async (req, res) => {
    let review = await Review.find();

    res.json({
        status: 'success',
        message: 'fetch Review successfully',
        review
    });
});



// @desc    Get Single Review 
// @route   GET /api/v1/Review:id
// @access  Public

export const getReviewIdCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) throw new Error('Review is not found');

    res.json({
        status: 'success',
        message: 'fetch Review Id successfully',
        review
    });
});


// @desc    Update Review 
// @route   PUT /api/v1/Review:id
// @access  Private/Admin

export const updateReviewCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;

    const review = await Review.findByIdAndUpdate(id, { message }, { new: true });
    if (!review) throw new Error('Review is not found');

    res.json({
        status: 'success',
        message: 'Review updated successfully',
        review
    });
});


// @desc    Delete Review 
// @route   Delete /api/v1/Review:id
// @access  Private/Admin

export const deleteReviewCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);
    if (!review) throw new Error('Review is not found');

    res.json({
        status: 'success',
        message: 'Review deleted successfully',
        review
    });
});
