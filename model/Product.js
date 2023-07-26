//product schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      ref: "Brand",
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    sizes:
    {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    totalQty: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// ProductSchema.virtual("qtyLeft").get(function () {
//   return this.totalQty - this.totalSold;
// });

ProductSchema.virtual("totalReviews").get(function () {
  return this.reviews.length;
});

ProductSchema.virtual("averageRating").get(function () {
  let total = 0;

  this.reviews.forEach((review) => {
    total += review.rating;
  });
  if (total == 0) return total;
  const averageRating = (total / this.reviews.length).toFixed(1);
  return averageRating;
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
