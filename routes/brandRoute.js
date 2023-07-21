import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createBrandCtrl, deleteBrandCtrl, getAllBrandCtrl, getBrandIdCtrl, updateBrandCtrl } from "../controllers/brandCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";

const brandRoutes = express.Router();

brandRoutes.post('/', isLoggedIn, isAdmin, createBrandCtrl);
brandRoutes.get('/', getAllBrandCtrl);
brandRoutes.get('/:id', getBrandIdCtrl);
brandRoutes.put('/:id', isLoggedIn, isAdmin, updateBrandCtrl);
brandRoutes.delete('/:id', isLoggedIn, isAdmin, deleteBrandCtrl);

export default brandRoutes;