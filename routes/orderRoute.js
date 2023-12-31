import express from "express";

import isAdmin from "../middlewares/isAdmin.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

import { createOrderCtrl, getOrderStatsCtrl, test } from "../controllers/orderCtrl.js";

const orderRoutes = express.Router();

orderRoutes.post('/', isLoggedIn, createOrderCtrl);
orderRoutes.get('/sales', isLoggedIn, isAdmin, getOrderStatsCtrl);

// test
orderRoutes.get('/test', test);
// orderRoutes.get('/', getAllColorCtrl);
// orderRoutes.get('/:id', getColorIdCtrl);
// orderRoutes.put('/:id', isLoggedIn, updateColorCtrl);
// orderRoutes.delete('/:id', isLoggedIn, deleteColorCtrl);

export default orderRoutes;