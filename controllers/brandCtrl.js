import asyncHandler from "express-async-handler";

import Brand from "../model/Brand.js";



// @desc    create new Brand
// @route   POST /api/v1/brand
// @access  Private/Admin

export const createBrandCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const brandExists = await Brand.findOne({ name });
    if (brandExists) throw new Error('Brand already exists');

    const brand = await Brand.create({
        name: name.toLowerCase(),
        user: req.userAuthId
    });

    res.json({
        status: 'success',
        message: 'Brand created successfully',
        brand
    });
});



// @desc    Get All Brand
// @route   GET /api/v1/brand
// @access  Public

export const getAllBrandCtrl = asyncHandler(async (req, res) => {
    let brand = await Brand.find();

    res.json({
        status: 'success',
        message: 'fetch brand successfully',
        brand
    });
});



// @desc    Get Single Brand 
// @route   GET /api/v1/brand:id
// @access  Public

export const getBrandIdCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const brand = await Brand.findById(id);
    if (!brand) throw new Error('Brand is not found');

    res.json({
        status: 'success',
        message: 'fetch Brand Id successfully',
        brand
    });
});


// @desc    Update Brand 
// @route   PUT /api/v1/brand:id
// @access  Private/Admin

export const updateBrandCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const brand = await Brand.findByIdAndUpdate(id, { name: name.toLowerCase() }, { new: true });
    if (!brand) throw new Error('Brand is not found');

    res.json({
        status: 'success',
        message: 'Brand updated successfully',
        brand
    });
});


// @desc    Delete Brand 
// @route   Delete /api/v1/brand:id
// @access  Private/Admin

export const deleteBrandCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) throw new Error('Brand is not found');

    res.json({
        status: 'success',
        message: 'Brand deleted successfully',
        brand
    });
});
