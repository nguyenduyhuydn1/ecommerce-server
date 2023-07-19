import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createColorCtrl, deleteColorCtrl, getAllColorCtrl, getColorIdCtrl, updateColorCtrl } from "../controllers/colorCtrl.js";

const colorRoutes = express.Router();

colorRoutes.post('/', isLoggedIn, createColorCtrl);
colorRoutes.get('/', getAllColorCtrl);
colorRoutes.get('/:id', getColorIdCtrl);
colorRoutes.put('/:id', isLoggedIn, updateColorCtrl);
colorRoutes.delete('/:id', isLoggedIn, deleteColorCtrl);

export default colorRoutes;