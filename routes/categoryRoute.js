import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createCategoryCtrl, deletecategoryCtrl, getCategoriesCtrl, getCategoryIdCtrl, updateCategoryCtrl } from "../controllers/categoryCtrl.js";

const categoriesRoutes = express.Router();

categoriesRoutes.post('/', isLoggedIn, createCategoryCtrl);
categoriesRoutes.get('/', getCategoriesCtrl);
categoriesRoutes.get('/:id', getCategoryIdCtrl);
categoriesRoutes.put('/:id', isLoggedIn, updateCategoryCtrl);
categoriesRoutes.delete('/:id', isLoggedIn, deletecategoryCtrl);

export default categoriesRoutes;