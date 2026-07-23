import mongoose, { Schema, model, models } from "mongoose";

const AttributeSchema = new Schema({
  name: { type: String, required: true }, // e.g. "Material", "Color"
  type: { type: String, enum: ['text', 'number', 'select', 'boolean'], required: true },
  options: [{ type: String }], // Only used if type is 'select'
  isRequired: { type: Boolean, default: false }
});

const AttributeSetSchema = new Schema(
  {
    name: { type: String, required: true }, // e.g. "Furniture", "Electronics"
    attributes: [AttributeSchema],
  },
  { 
    timestamps: true 
  }
);

if (models.AttributeSet) {
  delete (models as any).AttributeSet;
}

export const AttributeSet = models.AttributeSet || model("AttributeSet", AttributeSetSchema);
