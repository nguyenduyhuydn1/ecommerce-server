import express from "express";

import isAdmin from "../middlewares/isAdmin.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

import { createOrderCtrl, getOrderStatsCtrl } from "../controllers/orderCtrl.js";

const orderRoutes = express.Router();

orderRoutes.post('/', isLoggedIn, createOrderCtrl);
orderRoutes.get('/sales', isLoggedIn, isAdmin, getOrderStatsCtrl);
// orderRoutes.get('/', getAllColorCtrl);
// orderRoutes.get('/:id', getColorIdCtrl);
// orderRoutes.put('/:id', isLoggedIn, updateColorCtrl);
// orderRoutes.delete('/:id', isLoggedIn, deleteColorCtrl);

export default orderRoutes;