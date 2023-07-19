import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createBrandCtrl, deleteBrandCtrl, getAllBrandCtrl, getBrandIdCtrl, updateBrandCtrl } from "../controllers/brandCtrl.js";

const brandRoutes = express.Router();

brandRoutes.post('/', isLoggedIn, createBrandCtrl);
brandRoutes.get('/', getAllBrandCtrl);
brandRoutes.get('/:id', getBrandIdCtrl);
brandRoutes.put('/:id', isLoggedIn, updateBrandCtrl);
brandRoutes.delete('/:id', isLoggedIn, deleteBrandCtrl);

export default brandRoutes;