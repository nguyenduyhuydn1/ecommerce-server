import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createOrderCtrl } from "../controllers/orderCtrl.js";

const orderRoutes = express.Router();

orderRoutes.post('/', isLoggedIn, createOrderCtrl);
// orderRoutes.get('/', getAllColorCtrl);
// orderRoutes.get('/:id', getColorIdCtrl);
// orderRoutes.put('/:id', isLoggedIn, updateColorCtrl);
// orderRoutes.delete('/:id', isLoggedIn, deleteColorCtrl);

export default orderRoutes;