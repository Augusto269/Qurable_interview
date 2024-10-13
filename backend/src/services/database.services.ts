import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { DiscountsInterface } from '../schemas/discounts/discounts.schema';

@Injectable()
export class CatsService {
  constructor(
    @Inject('DISCOUNTS_MODEL')
    private catModel: Model<DiscountsInterface>,
  ) {}

  async create(createDiscountsDTO: any): Promise<DiscountsInterface> {
    const createdCat = new this.catModel(createDiscountsDTO);
    return createdCat.save();
  }

  async findAll(): Promise<DiscountsInterface[]> {
    return this.catModel.find().exec();
  }
}
