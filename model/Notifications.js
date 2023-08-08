import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotificationsSchema = new Schema(
    {
        productId: {
            type: Object
        },
        image: { type: String },
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);


const Notifications = mongoose.model("Notifications", NotificationsSchema);
export default Notifications;
