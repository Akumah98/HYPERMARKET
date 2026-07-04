'use strict';
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Product name is required'], trim: true, maxlength: 200 },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true, default: '' },
    price: { type: Number, required: [true, 'Price is required'], min: 0 },
    compareAtPrice: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: [true, 'Category is required'] },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Vendor is required'] },
    images: { type: [String], default: [] },
    stock: { type: Number, required: true, min: 0, default: 0 },
    batches: {
      type: [{
        batchNumber: { type: String, required: true },
        quantity: { type: Number, required: true, min: 0 },
        expiryDate: { type: Date, required: true },
        warehouseZone: { type: String, default: 'Zone A (General)' }
      }],
      default: []
    },
    unit: { type: String, enum: ['kg', 'g', 'L', 'mL', 'piece', 'bundle', 'pack', 'bag'], default: 'piece' },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

productSchema.pre('save', function () {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  if (this.batches && this.batches.length > 0) {
    this.stock = this.batches.reduce((sum, b) => sum + b.quantity, 0);
  }
});

productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ vendor: 1 });
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
