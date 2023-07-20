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

//connect database
dbConnect();
const app = express();

app.use(express.json());


// routes
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/brand', brandRoutes);
app.use('/api/v1/color', colorRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/order', orderRoutes);


//error middleware
app.use(notFound);
app.use(globalErrHandler);

export default app;