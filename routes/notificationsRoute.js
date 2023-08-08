import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";
import { createNotificationsCtrl, getNotificationsCtrl } from "../controllers/notificationsCtrl.js";

const NotificationsRoutes = express.Router();

NotificationsRoutes.post('/', isLoggedIn, isAdmin, createNotificationsCtrl);

NotificationsRoutes.get('/', getNotificationsCtrl);
// NotificationsRoutes.get('/:id', getCouponIdCtrl);
// NotificationsRoutes.put('/:id', isLoggedIn, isAdmin, updateCouponCtrl);
// NotificationsRoutes.delete('/:id', isLoggedIn, isAdmin, deleteCouponCtrl);

export default NotificationsRoutes;