import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { MerchantInterface } from 'src/schemas/merchants/merchant.schema';

@Injectable()
export class DiscountsService {
  constructor(
    @Inject('MERCHANTS_MODEL')
    private discountModel: Model<MerchantInterface>,
  ) {}

  async create(any: any): Promise<MerchantInterface> {
    //TBD the create model
    const createdCat = new this.discountModel(any);
    return createdCat.save();
  }

  async findAll(): Promise<MerchantInterface[]> {
    return this.discountModel.find().exec();
  }
  async findOne(id: string): Promise<MerchantInterface | boolean> {
    //Hardcode validation for now
    return true;
    return this.discountModel.findOne({ _id: id });
  }
}
