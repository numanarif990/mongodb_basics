const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter product name"],
    },
    price: {
      type: Number,
      required: [true, "please enter product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "please enter product description"],
    },
    image: {
      type: String,
      required: [false, "please enter product image"],
    },
  },

  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
