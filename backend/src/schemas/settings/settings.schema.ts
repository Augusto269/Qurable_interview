import * as mongoose from 'mongoose';

export const SettingsDiscount = new mongoose.Schema({
  id: String,
  client: String,
  max_discounts_tickets: Number,
  coupon_discount: String,
  percentage: Number,
  type: String,
  rules: String,
  createdAt: Date,
  updatedAt: Date,
});

export interface SettingsDiscountInterface extends mongoose.Document {
  _id: string;
  client: string;
  max_discounts_tickets: number;
  coupon_discount: string;
  percentage: number;
  type: string;
  rules?: string;
  createdAt: Date;
  updatedAt: Date;
}
