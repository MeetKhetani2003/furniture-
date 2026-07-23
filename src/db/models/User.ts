import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    cart: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    addresses: [
      {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, default: "India" },
        isDefault: { type: Boolean, default: false },
        type: { type: String, enum: ["Home", "Office", "Other"], default: "Home" },
      },
    ],
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
