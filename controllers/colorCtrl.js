import asyncHandler from "express-async-handler";

import Color from "../model/Color.js";



// @desc    create New Color
// @route   POST /api/v1/color
// @access  Private/Admin

export const createColorCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const colorExists = await Color.findOne({ name });
    if (colorExists) throw new Error('Color already exists');

    const color = await Color.create({
        name: name.toLowerCase(),
        user: req.userAuthId
    });

    res.json({
        status: 'success',
        message: 'Color created successfully',
        color
    });
});



// @desc    Get All Color
// @route   GET /api/v1/color
// @access  Public

export const getAllColorCtrl = asyncHandler(async (req, res) => {
    let color = await Color.find();

    res.json({
        status: 'success',
        message: 'fetch Color successfully',
        color
    });
});



// @desc    Get Single Color 
// @route   GET /api/v1/color:id
// @access  Public

export const getColorIdCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const color = await Color.findById(id);
    if (!color) throw new Error('Color is not found');

    res.json({
        status: 'success',
        message: 'fetch Color Id successfully',
        color
    });
});


// @desc    Update Color 
// @route   PUT /api/v1/color:id
// @access  Private/Admin

export const updateColorCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const color = await Color.findByIdAndUpdate(id, { name: name.toLowerCase() }, { new: true });
    if (!color) throw new Error('Color is not found');

    res.json({
        status: 'success',
        message: 'Color updated successfully',
        color
    });
});


// @desc    Delete Color 
// @route   Delete /api/v1/Color:id
// @access  Private/Admin

export const deleteColorCtrl = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const color = await Color.findByIdAndDelete(id);
    if (!color) throw new Error('Color is not found');

    res.json({
        status: 'success',
        message: 'Color deleted successfully',
        color
    });
});
