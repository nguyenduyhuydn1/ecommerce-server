
import express from "express";


import { createProductCtrl, deleteProductCtrl, getProductIdCtrl, getProductsCtrl, updateProductCtrl } from "../controllers/productCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";

const productRoutes = express.Router();

productRoutes.post('/', isLoggedIn, isAdmin, upload('ecommerce').array('files'), createProductCtrl);
productRoutes.get('/', getProductsCtrl);
productRoutes.get('/:id', getProductIdCtrl);
productRoutes.put('/:id', isLoggedIn, isAdmin, updateProductCtrl);
productRoutes.delete('/:id', isLoggedIn, isAdmin, deleteProductCtrl);

export default productRoutes;