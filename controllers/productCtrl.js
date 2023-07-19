import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

import Product from "../model/Product.js";


// @desc    create new product
// @route   POST /api/v1/products
// @access  Private/Admin

export const createProductCtrl = asyncHandler(async (req, res) => {
    const { name, description, brand, category, sizes, colors, user, images, price, totalQty } = req.body;

    const productExists = await Product.findOne({ name });
    if (productExists) throw new Error('product already exists');

    const product = await Product.create({
        name,
        description,
        brand,
        category,
        sizes,
        colors,
        user: req.userAuthId,
        images,
        price,
        totalQty
    });


    res.json({
        status: 'success',
        message: 'product created successfully',
        product
    });
});



// @desc    get products
// @route   GET /api/v1/products
// @access  Public

export const getProductsCtrl = asyncHandler(async (req, res) => {
    let { name, description, brand, category, sizes, colors, price, limit, page } = req.query;
    let productQuery = Product.find();

    //get by query
    if (name) productQuery = productQuery.find({ name: { $regex: name, $options: 'i' } });
    if (description) productQuery = productQuery.find({ description: { $regex: description, $options: 'i' } });
    if (brand) productQuery = productQuery.find({ brand: { $regex: brand, $options: 'i' } });
    if (category) productQuery = productQuery.find({ category: { $regex: category, $options: 'i' } });
    if (sizes) productQuery = productQuery.find({ sizes: { $regex: sizes, $options: 'i' } });
    if (colors) productQuery = productQuery.find({ colors: { $regex: colors, $options: 'i' } });
    if (price) {
        const priceRange = price.split('-');
        productQuery = productQuery.find({ price: { $gte: priceRange[0], $lte: priceRange[1] || priceRange[0] } });
    }

    //handle page
    page = parseInt(page) ? parseInt(page) : 1;
    limit = parseInt(limit) ? parseInt(limit) : 10;

    const startIndex = (page - 1) * 10;
    const endIndex = page * limit;

    const total = await Product.countDocuments();
    productQuery = productQuery.skip(startIndex).limit(endIndex);

    //handle pagination
    let pagination = {};
    if (endIndex < total) pagination.next = { page: page + 1, limit };
    if (startIndex > 0) pagination.prev = { page: page - 1, limit };


    let products = await productQuery;

    res.json({
        status: 'success',
        total,
        results: products.length,
        pagination,
        message: 'fetch products successfully',
        products
    });
});



// @desc    Get Single product 
// @route   GET /api/v1/products:id
// @access  Public

export const getProductIdCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) throw new Error('product is not found');

    res.json({
        status: 'success',
        message: 'fetch product Id successfully',
        product
    });
});


// @desc    Update product 
// @route   PUT /api/v1/products:id
// @access  Private/Admin

export const updateProductCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, brand, category, sizes, colors, price, limit, page } = req.body;

    const product = await Product.findByIdAndUpdate(id, {
        name, description, brand, category, sizes, colors, price, limit, page
    }, { new: true });

    if (!product) throw new Error('product is not found');

    res.json({
        status: 'success',
        message: 'product updated successfully',
        product
    });
});


// @desc    Delete product 
// @route   PUT /api/v1/products:id
// @access  Private/Admin

export const deleteProductCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) throw new Error('product is not found');

    res.json({
        status: 'success',
        message: 'product deleted successfully',
        product
    });
});
