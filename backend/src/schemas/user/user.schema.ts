import * as mongoose from 'mongoose';

export const User = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  createdAt: Date,
  updatedAt: Date,
});

export interface UserInterface extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
