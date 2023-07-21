import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createCouponCtrl, deleteCouponCtrl, getAllCouponCtrl, getCouponIdCtrl, updateCouponCtrl } from "../controllers/couponsCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";

const couponsRoutes = express.Router();

couponsRoutes.post('/', isLoggedIn, isAdmin, createCouponCtrl);
couponsRoutes.get('/', getAllCouponCtrl);
couponsRoutes.get('/:id', getCouponIdCtrl);
couponsRoutes.put('/:id', isLoggedIn, isAdmin, updateCouponCtrl);
couponsRoutes.delete('/:id', isLoggedIn, isAdmin, deleteCouponCtrl);

export default couponsRoutes;