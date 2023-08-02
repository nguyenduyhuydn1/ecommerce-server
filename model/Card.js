import mongoose from 'mongoose';
const { Schema } = mongoose;

const CardSchema = new Schema(
    {
        cardName: {
            type: String,
            required: true,
        },
        cardNumber: {
            type: String,
            required: true,
            unique: true
        },
        cardEpxear: {
            type: String,
            required: true,
        },
        cardExpMonth: {
            type: String,
            required: true,
        },
        cardCVC: {
            type: String,
            required: true,
        },
        customerId: {
            type: String,
            required: true,
        },
        cardId: {
            type: String,
            required: true,
        },
        cardNumber: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Card = mongoose.model("Card", CardSchema);
export default Card;
