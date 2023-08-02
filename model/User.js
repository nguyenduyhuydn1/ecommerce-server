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
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        postalCode: {
            type: String,
        },
        province: {
            type: String,
        },
        country: {
            type: String,
        },
        phone: {
            type: String,
        }
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