import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, index: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  price: { type: Number, required: true, min: 0, index: true },
  discountPrice: { type: Number, default: 0 },
  discountPercentage: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
  subCategory: { type: String, default: '' },
  brand: { type: String, required: true, trim: true, index: true },
  images: [{ type: String, required: true }],
  stock: { type: Number, required: true, default: 0, min: 0 },
  sku: { type: String, required: true, unique: true },
  specifications: [{
    key: { type: String, required: true },
    value: { type: String, required: true }
  }],
  features: [{ type: String }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

productSchema.pre('save', function(next) {
  if (this.discountPrice > 0 && this.price > 0) {
    this.discountPercentage = Math.round(((this.price - this.discountPrice) / this.price) * 100);
  } else {
    this.discountPercentage = 0;
  }
  next();
});

export default mongoose.model('Product', productSchema);
