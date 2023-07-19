import { verifyToken } from "../utils/verifyToken.js";


export const isLoggedIn = (req, res, next) => {
    //verify token
    const decodedUser = verifyToken(req);

    if (!decodedUser) throw Error('token is expired or invalid, please login again');

    req.userAuthId = decodedUser.id;
    next();
};
