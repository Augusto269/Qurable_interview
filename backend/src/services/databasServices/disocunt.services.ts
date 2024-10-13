import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { DiscountsInterface } from 'src/schemas/discounts/discounts.schema';
import { SettingsCreateDiscountsRulesDto } from 'src/controllers/settings/settings.create-discounts-rules.dio';

@Injectable()
export class DiscountsService {
  constructor(
    @Inject('DISCOUNTS_MODEL')
    private discountModel: Model<DiscountsInterface>,
  ) {}

  async create(
    bodyCreateRules: SettingsCreateDiscountsRulesDto,
  ): Promise<DiscountsInterface> {
    const createdCat = new this.discountModel(bodyCreateRules);
    return createdCat.save();
  }

  async findAll(): Promise<DiscountsInterface[]> {
    return this.discountModel.find().exec();
  }
  async findOne(id: string): Promise<DiscountsInterface> {
    return this.discountModel.findOne({ _id: id });
  }
}
