import * as mongoose from 'mongoose';

export const SettingsDiscount = new mongoose.Schema({
  id: String,
  client: String,
  max_discounts_tickets: Number,
  type: String,
  createdAt: Date,
  updatedAt: Date,
});

export interface SettingsDiscountInterface extends mongoose.Document {
  id: string;
  client: string;
  max_discounts_tickets: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
