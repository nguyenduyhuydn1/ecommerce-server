import http from 'http';

import app from './app/app.js';
// MONGO_URL=mongodb+srv://nguyenduyhuydn1:hFytCtmcAlK75WWX@cluster0.yjqvz6i.mongodb.net/?retryWrites=true&w=majority

// CLOUDINARY_NAME=drbkeffpu
// CLOUDINARY_API_KEY=517213353523123
// CLOUDINARY_API_SECRET=K5ffk2AA_H5gkRjl-OWJb9NBfjQ
// CLOUDINARY_URL=cloudinary://517213353523123:K5ffk2AA_H5gkRjl-OWJb9NBfjQ@drbkeffpu

// STRIPE_KEY=
// JWT_KEY=keyword1

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
server.listen(PORT, console.log(`server is running on port ${PORT}`));