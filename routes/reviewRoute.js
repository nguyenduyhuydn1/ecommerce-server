import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createReviewCtrl, deleteReviewCtrl, getAllReviewCtrl, getReviewIdCtrl, updateReviewCtrl } from "../controllers/reviewCtrl.js";

const reviewRoutes = express.Router();

reviewRoutes.post('/:productId', isLoggedIn, createReviewCtrl);
reviewRoutes.get('/', getAllReviewCtrl);
reviewRoutes.get('/:id', getReviewIdCtrl);
reviewRoutes.put('/:id', isLoggedIn, updateReviewCtrl);
reviewRoutes.delete('/:id', isLoggedIn, deleteReviewCtrl);

export default reviewRoutes;