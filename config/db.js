import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        mongoose.set('strictQuery', true);
        const connected = await mongoose.connect(process.env.MONGO_URL);

        console.log(`mongodb connected on host ${connected.connection.host}`);
    } catch (error) {
        console.log(`Error ${error.message}`);
        process.exit(1);
    }
};

export default dbConnect;