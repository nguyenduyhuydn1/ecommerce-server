import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import { verifyToken } from "../utils/verifyToken.js";


export const isLoggedIn = asyncHandler(async (req, res, next) => {
    //verify token
    const decodedUser = verifyToken(req);
    if (!decodedUser) throw new Error('token is expired or invalid, please login again');

    const user = await User.findById(decodedUser.id);
    if (!user) throw new Error('user is not found, pls login again');

    req.userAuthId = user._id;
    next();
});
