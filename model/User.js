import mongoose from 'mongoose';
const { Schema } = mongoose;



const UserSchema = new Schema({
    fullname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    wishLists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WishList",
        },
    ],
    isAdmin: {
        type: Boolean,
        default: false
    },
    hasShippingAddress: {
        type: Boolean,
        default: false
    },
    shippingAddress: {
        fullName: {
            type: String,
            default: '',
        },
        address: {
            type: String,
            default: '',
        },
        city: {
            type: String,
            default: '',
        },
        postalCode: {
            type: String,
            default: '',
        },
        country: {
            type: String,
            default: '',
        },
        phone: {
            type: String,
            default: '',
        },

    }
}, {
    timestamps: true,
});

// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//         next();
//     }

//     const salt = await bcrypt.genSaltSync(10);
//     this.password = await bcrypt.hash(this.password, salt);

//     next();
// });

// userSchema.methods.isPasswordMatched = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.methods.createPasswordResetToken = async function () {
//     const resettoken = crypto.randomBytes(32).toString("hex");
//     this.passwordResetToken = crypto
//         .createHash("sha256")
//         .update(resettoken)
//         .digest("hex");
//     this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
//     return resettoken;
// };

const User = mongoose.model('User', UserSchema);
export default User;