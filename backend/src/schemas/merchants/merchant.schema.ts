import * as mongoose from 'mongoose';

export const Merchant = new mongoose.Schema({
  id: String,
  name: String,
  createdAt: Date,
  updatedAt: Date,
});

export interface MerchantInterface extends mongoose.Document {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
