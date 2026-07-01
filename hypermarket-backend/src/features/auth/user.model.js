const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, default: '' },
    quarter: { type: String, default: '' },
    city: { type: String, default: '' },
    region: { type: String, default: '' },
  },
  { _id: false }
);

const billingSchema = new mongoose.Schema(
  {
    paymentMethod: { type: String, enum: ['mtn_momo', 'orange_money', ''], default: '' },
    phone: { type: String, default: '' },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['customer', 'vendor', 'admin'],
      default: 'customer',
    },
    phone: { type: String, trim: true, default: '' },
    address: { type: addressSchema, default: () => ({}) },
    billing: { type: billingSchema, default: () => ({}) },
    expoPushToken: { type: String, default: '' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
