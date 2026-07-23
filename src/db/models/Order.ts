import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentMethod: { type: String, required: true }, // e.g., 'Razorpay'
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    shiprocketShipmentId: { type: String },
    shiprocketOrderId: { type: String },
    awbCode: { type: String },
    shippingAddress: {
      fullName: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      postalCode: String,
      country: { type: String, default: "India" },
      phone: String,
    },
  },
  { timestamps: true }
);

export const Order = models.Order || model("Order", OrderSchema);
