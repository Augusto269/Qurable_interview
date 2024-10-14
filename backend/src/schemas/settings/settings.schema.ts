import * as mongoose from 'mongoose';

export const SettingsDiscount = new mongoose.Schema({
  client: {
    type: String,
    required: true,
  },
  max_discounts_tickets: {
    type: Number,
    required: true,
    min: [1, 'Maximum discounts tickets must be at least 1'],
  },
  left_discounts_tickets: {
    type: Number,
    required: true,
    default: 0,
  },
  percentage: {
    type: Number,
    required: true,
    min: [0, 'Percentage must be at least 0'],
    max: [100, 'Percentage must not exceed 100'],
  },
  type: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

SettingsDiscount.pre('save', function (next) {
  if (this.isNew) {
    this.left_discounts_tickets = this.max_discounts_tickets;
  }
  next();
});
export interface SettingsDiscountInterface extends mongoose.Document {
  _id: string;
  client: string;
  max_discounts_tickets: number;
  left_discounts_tickets?: Number;
  percentage: number;
  type: string;
  rules?: string;
  createdAt: Date;
  updatedAt: Date;
}
