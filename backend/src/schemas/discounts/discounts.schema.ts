import * as mongoose from 'mongoose';

export const Discounts = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});

export interface DiscountsInterface extends mongoose.Document {
  name: string;
  age: number;
  breed: string;
}
