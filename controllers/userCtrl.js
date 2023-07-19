import asyncHandler from "express-async-handler";
import User from '../model/User.js';
import bcrypt from 'bcryptjs';


// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Private/Admin

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
// @access  Private/Admin

export const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (!userFound) throw new Error('user is not found');

    const comparePassword = await bcrypt.compare(password, userFound.password);
    if (!comparePassword) throw new Error('password is wrong');

    res.json({
        status: 'success',
        message: 'user logged in successfully',
        user: userFound
    });
});
