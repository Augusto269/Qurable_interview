import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import {
  DiscountsInterface,
  DiscountsInterfaceCreate,
} from 'src/schemas/discounts/discounts.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject('DISCOUNTS_MODEL')
    private discountModel: Model<DiscountsInterface>,
  ) {}

  async create(
    bodyCreateRules: DiscountsInterfaceCreate,
  ): Promise<DiscountsInterface> {
    const createdCat = new this.discountModel(bodyCreateRules);
    return createdCat.save();
  }

  async findOneByCouponDiscount(coupon: string): Promise<DiscountsInterface> {
    return this.discountModel.findOne({ coupon_discount: coupon });
  }
  async findAll(): Promise<DiscountsInterface[]> {
    return this.discountModel.find().exec();
  }
  async findOne(id: string): Promise<DiscountsInterface> {
    return this.discountModel.findOne({ _id: id });
  }
}
