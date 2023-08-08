import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../model/User.js';


// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Public

export const registerUserCtrl = asyncHandler(async (req, res) => {
    const { fullname, email, password, service } = req.body;

    const userExists = await User.findOne({ email });

    if (service && userExists) {
        //hash password
        const salt = await bcrypt.genSaltSync(10);
        const hasedPassword = await bcrypt.hash(password, salt);

        //create user
        const user = await User.create({
            fullname,
            email,
            password: hasedPassword,
        });

        //gerenate token
        const gerenateToken = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '3d' });

        res.status(200).json({
            status: 'success',
            message: 'user logged in successfully',
            user: userExists,
            token: gerenateToken
        });

    } else {
        if (userExists) throw new Error('user already exists');

        //hash password
        const salt = await bcrypt.genSaltSync(10);
        const hasedPassword = await bcrypt.hash(password, salt);

        //create user
        const user = await User.create({
            fullname,
            email,
            password: hasedPassword,
        });

        res.status(201).json({
            status: 'success', message: 'User registered successfully', user
        });
    }
});


// @desc    login user
// @route   POST /api/v1/users/login
// @access  Public

export const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //check user
    const userFound = await User.findOne({ email });
    if (!userFound) throw new Error('user is not found');

    //check password
    const comparePassword = await bcrypt.compare(password, userFound.password);
    if (!comparePassword) throw new Error('password is wrong');

    //gerenate token
    const gerenateToken = jwt.sign({ id: userFound._id }, process.env.JWT_KEY, { expiresIn: '3d' });

    res.json({
        status: 'success',
        message: 'user logged in successfully',
        user: userFound,
        token: gerenateToken
    });
});


// @desc    Get User Profile
// @route   GET /api/v1/users/profile
// @access  Private


export const getUserProfileCtrl = asyncHandler(async (req, res) => {


    const user = await User.findById(req.userAuthId).populate("orders");
    res.json({
        status: "success",
        message: "User profile fetched successfully",
        user,
    });
});




// // @desc    GET user shipping address
// // @route   GET /api/v1/users/update/shipping
// // @access  Private

// export const getShippingAddresctrl = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.userAuthId);
//     res.json({
//         status: "success",
//         message: "User shipping address updated successfully",
//         user,
//     });
// });







// @desc    Update user shipping address
// @route   PUT /api/v1/users/update/shipping
// @access  Private

export const updateShippingAddresctrl = asyncHandler(async (req, res) => {
    const { fullName, address, city, postalCode, phone, country } = req.body;


    let hasShippingAddress = false;
    if (fullName && address && city && postalCode && phone && country) hasShippingAddress = true;

    const user = await User.findByIdAndUpdate(
        req.userAuthId,
        {
            shippingAddress: {
                fullName, address, city, postalCode, phone, country
            },
            hasShippingAddress,
        },
        {
            new: true,
        }
    );

    res.json({
        status: "success",
        message: "User shipping address updated successfully",
        user,
    });
});