
import express from "express";


import { createProductCtrl, deleteProductCtrl, getProductIdCtrl, getProductsCtrl, updateProductCtrl } from "../controllers/productCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import upload from "../config/fileUpload.js";

const productRoutes = express.Router();

productRoutes.post('/', isLoggedIn, upload('ecommerce').array('files'), createProductCtrl);
productRoutes.get('/', getProductsCtrl);
productRoutes.get('/:id', getProductIdCtrl);
productRoutes.put('/:id', isLoggedIn, updateProductCtrl);
productRoutes.delete('/:id', isLoggedIn, deleteProductCtrl);

export default productRoutes;