import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createColorCtrl, deleteColorCtrl, getAllColorCtrl, getColorIdCtrl, updateColorCtrl } from "../controllers/colorCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";

const colorRoutes = express.Router();

colorRoutes.post('/', isLoggedIn, isAdmin, createColorCtrl);
colorRoutes.get('/', getAllColorCtrl);
colorRoutes.get('/:id', getColorIdCtrl);
colorRoutes.put('/:id', isLoggedIn, isAdmin, updateColorCtrl);
colorRoutes.delete('/:id', isLoggedIn, isAdmin, deleteColorCtrl);

export default colorRoutes;