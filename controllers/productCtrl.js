import asyncHandler from "express-async-handler";

import Product from "../model/Product.js";
import Category from "../model/Category.js";
import Brand from "../model/Brand.js";


// @desc    create new product
// @route   POST /api/v1/products
// @access  Private/Admin

export const createProductCtrl = asyncHandler(async (req, res) => {
    const { name, description, brand, category, sizes, colors, price, totalQty } = req.body;
    let files = req.files?.map(v => v.path);
    //check product exists
    const productExists = await Product.findOne({ name });
    if (productExists) throw new Error('product already exists');

    //check category exists
    const categoryFound = await Category.findOne({ name: category });
    if (!categoryFound) throw new Error('Category is not found, please create a category first');

    //check brand exists
    const brandFound = await Brand.findOne({ name: brand });
    if (!brandFound) throw new Error('brand is not found, please create a brand first');



    const product = await Product.create({
        name,
        description,
        brand,
        category,
        sizes,
        colors,
        user: req.userAuthId,
        images: files,
        price,
        totalQty
    });

    // save product to category
    categoryFound.products.push(product._id);
    await categoryFound.save();

    // save product to brand
    brandFound.products.push(product._id);
    await brandFound.save();

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


    let products = await productQuery.populate('reviews');

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

    const product = await Product.findById(id).populate('reviews');

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
// @route   Delete /api/v1/products:id
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
