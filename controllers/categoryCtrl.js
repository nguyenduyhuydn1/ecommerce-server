import asyncHandler from "express-async-handler";

import Category from "../model/Category.js";



// @desc    create new category
// @route   POST /api/v1/categories
// @access  Private/Admin

export const createCategoryCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) throw new Error('pls give me name of category');

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) throw new Error('category already exists');

    const category = await Category.create({
        name: name.toLowerCase(),
        image: req.file.path,
        user: req.userAuthId
    });

    res.json({
        status: 'success',
        message: 'category created successfully',
        category
    });
});



// @desc    get categories
// @route   GET /api/v1/categories
// @access  Public

export const getCategoriesCtrl = asyncHandler(async (req, res) => {
    let categories = await Category.find();

    res.json({
        status: 'success',
        message: 'fetch categories successfully',
        categories
    });
});



// @desc    Get Single Category 
// @route   GET /api/v1/categories:id
// @access  Public

export const getCategoryIdCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) throw new Error('category is not found');

    res.json({
        status: 'success',
        message: 'fetch category Id successfully',
        category
    });
});


// @desc    Update Category 
// @route   PUT /api/v1/categories:id
// @access  Private/Admin

export const updateCategoryCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, image } = req.body;

    const category = await Category.findByIdAndUpdate(id, { name, image }, { new: true });
    if (!category) throw new Error('category is not found');

    res.json({
        status: 'success',
        message: 'category updated successfully',
        category
    });
});


// @desc    Delete Category 
// @route   Delete /api/v1/categories:id
// @access  Private/Admin

export const deletecategoryCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new Error('category is not found');

    res.json({
        status: 'success',
        message: 'category deleted successfully',
        category
    });
});
