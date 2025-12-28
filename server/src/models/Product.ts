import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  images: string[];
  description?: string;
  price: number;
  discount?: number;
  categories?: string[];
  stock?: number;
  brand?: string;
  status?: string;
  variant?: string;
  isFeatured?: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    images: [{ type: String }],
    description: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    categories: [{ type: String }],
    stock: { type: Number, default: 0 },
    brand: { type: String },
    status: { type: String },
    variant: { type: String },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
