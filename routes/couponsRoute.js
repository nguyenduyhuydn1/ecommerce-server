import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createCouponCtrl, deleteCouponCtrl, getAllCouponCtrl, getCouponIdCtrl, updateCouponCtrl } from "../controllers/couponsCtrl.js";

const couponsRoutes = express.Router();

couponsRoutes.post('/', isLoggedIn, createCouponCtrl);
couponsRoutes.get('/', getAllCouponCtrl);
couponsRoutes.get('/:id', getCouponIdCtrl);
couponsRoutes.put('/:id', isLoggedIn, updateCouponCtrl);
couponsRoutes.delete('/:id', isLoggedIn, deleteCouponCtrl);

export default couponsRoutes;