import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../model/User.js';


// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Public

export const registerUserCtrl = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    const userExists = await User.findOne({ email });
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
        status: 'success', message: 'User registered successfully', data: user
    });
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

    res.json({
        msg: "ASd"
    });
});