import * as mongoose from 'mongoose';

export const Discounts = new mongoose.Schema({
  settings_id: { type: String, required: true },
  client: { type: String, required: true },
  coupon_discount: { type: String, required: true },
  user_email: { type: String, required: true },
  percentage: { type: Number, required: true },
  type: { type: String, required: true },
  usedAt: { type: Date },
  usedFor: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export interface DiscountsInterfaceCreate {
  settings_id: string;
  client: string;
  coupon_discount: string;
  user_email?: string;
  usedAt?: Date;
  usedFor?: string;
  percentage: number;
  type: string;
}

export interface DiscountsInterface extends mongoose.Document {
  settings_id: string;
  client: string;
  user_email?: string;
  coupon_discount: string;
  percentage: number;
  usedAt?: Date;
  usedFor?: string;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}
