import dotevn from 'dotenv';
dotevn.config();
import express from "express";

import dbConnect from "../config/db.js";
import { globalErrHandler, notFound } from '../middlewares/globalErrHandler.js';

import userRoutes from '../routes/usersRoute.js';
import productRoutes from '../routes/productRoute.js';
import categoriesRoutes from '../routes/categoryRoute.js';
import brandRoutes from '../routes/brandRoute.js';
import colorRoutes from '../routes/colorRoute.js';
import reviewRoutes from '../routes/reviewRoute.js';
import orderRoutes from '../routes/orderRoute.js';
import couponsRoutes from '../routes/couponsRoute.js';

//connect database
dbConnect();
const app = express();

app.use(express.json());


// routes
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/brands', brandRoutes);
app.use('/api/v1/colors', colorRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/coupons', couponsRoutes);


//error middleware
app.use(notFound);
app.use(globalErrHandler);

export default app;