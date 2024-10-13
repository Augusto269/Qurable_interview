import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { SettingsDiscountInterface } from 'src/schemas/settings/settings.schema';

@Injectable()
export class SettingsDiscountsService {
  constructor(
    @Inject('SETTINGS_DISCOUNTS_MODEL')
    private discountModel: Model<SettingsDiscountInterface>,
  ) {}

  async create(createDiscountsDTO: any): Promise<SettingsDiscountInterface> {
    const createdCat = new this.discountModel(createDiscountsDTO);
    return createdCat.save();
  }

  async findAll(): Promise<SettingsDiscountInterface[]> {
    return this.discountModel.find().exec();
  }
  async findOne(id: string): Promise<SettingsDiscountInterface> {
    return this.discountModel.findOne({ _id: id });
  }
}
