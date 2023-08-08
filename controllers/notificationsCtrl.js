import asyncHandler from "express-async-handler";

import Product from "../model/Product.js";
import Notifications from "../model/Notifications.js";






// @desc    create New Notifications
// @route   POST /api/v1/Notifications
// @access  Private/Admin

export const createNotificationsCtrl = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { body, title, image, productId } = req.body;



    const productExists = await Product.findById(productId?.id);
    if (!productExists) throw Error('product is not found');


    const notification = await Notifications.create({
        body, productId, title,
        image: image ? image : '',
    });


    res.json({
        status: 'success',
        message: 'Notifications created successfully',
        notification
    });
});



// @desc    Get Notifications
// @route   Get /api/v1/Notifications
// @access  Private/Admin

export const getNotificationsCtrl = asyncHandler(async (req, res) => {
    const notification = await Notifications.find();

    res.json({
        status: 'success',
        message: 'Notifications created successfully',
        notification
    });
});
