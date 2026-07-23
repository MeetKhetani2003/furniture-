import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    groups: [
      {
        title: { type: String },
        items: [
          {
            name: { type: String },
            slug: { type: String },
            image: { type: String }
          }
        ]
      }
    ],
    attributeSet: { type: Schema.Types.ObjectId, ref: 'AttributeSet' },
  },
  { 
    timestamps: true 
  }
);

if (models.Category) {
  delete (models as any).Category;
}

export const Category = models.Category || model("Category", CategorySchema);
