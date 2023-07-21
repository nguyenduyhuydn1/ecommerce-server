import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createReviewCtrl, deleteReviewCtrl, getAllReviewCtrl, getReviewIdCtrl, updateReviewCtrl } from "../controllers/reviewCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";

const reviewRoutes = express.Router();

reviewRoutes.post('/:productId', isLoggedIn, createReviewCtrl);
reviewRoutes.get('/', getAllReviewCtrl);
reviewRoutes.get('/:id', getReviewIdCtrl);
reviewRoutes.put('/:id', isLoggedIn, isAdmin, updateReviewCtrl);
reviewRoutes.delete('/:id', isLoggedIn, isAdmin, deleteReviewCtrl);

export default reviewRoutes;