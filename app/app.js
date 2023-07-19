import dotevn from 'dotenv';
dotevn.config();
import express from "express";

import dbConnect from "../config/db.js";
import { globalErrHandler, notFound } from '../middlewares/globalErrHandler.js';

import userRoutes from '../routes/usersRoute.js';

//connect database
dbConnect();
const app = express();

app.use(express.json());


// routes
app.use('/', userRoutes);


//error middleware
app.use(notFound);
app.use(globalErrHandler);

export default app;