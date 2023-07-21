import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createCategoryCtrl, deletecategoryCtrl, getCategoriesCtrl, getCategoryIdCtrl, updateCategoryCtrl } from "../controllers/categoryCtrl.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";

const categoriesRoutes = express.Router();

categoriesRoutes.post('/', isLoggedIn, isAdmin, upload('categories').single('file'), createCategoryCtrl);
categoriesRoutes.get('/', getCategoriesCtrl);
categoriesRoutes.get('/:id', getCategoryIdCtrl);
categoriesRoutes.put('/:id', isLoggedIn, isAdmin, updateCategoryCtrl);
categoriesRoutes.delete('/:id', isLoggedIn, isAdmin, deletecategoryCtrl);

export default categoriesRoutes;