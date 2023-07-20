import express from "express";

import { getUserProfileCtrl, loginUserCtrl, registerUserCtrl, updateShippingAddresctrl } from "../controllers/userCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const userRoutes = express.Router();

userRoutes.post('/register', registerUserCtrl);
userRoutes.post('/login', loginUserCtrl);
userRoutes.get('/profile', isLoggedIn, getUserProfileCtrl);
userRoutes.get('/update/shipping', isLoggedIn, updateShippingAddresctrl);

export default userRoutes;