import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  role: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer"
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;
