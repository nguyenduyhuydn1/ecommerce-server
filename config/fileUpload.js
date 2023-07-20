import dotevn from 'dotenv';
dotevn.config();

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

const upload = (folder) => {
    cloudinary.config({
        // cloud_name: 'drbkeffpu',
        // api_key: '517213353523123',
        // api_secret: 'K5ffk2AA_H5gkRjl-OWJb9NBfjQ',
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
    });

    // Create storage engine for Multer
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        allowedFormats: ["jpg", "png"],
        params: {
            folder: folder,
        },
    });

    // Init Multer with the storage engine
    const upload = multer({ storage: storage });
    return upload;
};

export default upload;
