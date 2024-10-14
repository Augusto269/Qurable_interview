import { Model } from 'mongoose';
import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { SettingsDiscountInterface } from 'src/schemas/settings/settings.schema';
import { generateCoupon } from 'src/commons/Cupons.helper';

@Injectable()
export class SettingsDiscountsService {
  constructor(
    @Inject('SETTINGS_DISCOUNTS_MODEL')
    private discountModel: Model<SettingsDiscountInterface>,
  ) {}

  async create(createDiscountsDTO: any): Promise<SettingsDiscountInterface> {
    if (!createDiscountsDTO.coupon_discount) {
      createDiscountsDTO.coupon_discount = generateCoupon();
    }
    const existingDiscount = await this.discountModel.findOne({
      coupon_discount: createDiscountsDTO.coupon_discount,
    });
    if (existingDiscount) {
      throw new HttpException('Coupon already exists', HttpStatus.BAD_REQUEST);
    }
    //We have to attach the client.id to the discount, for testing propose we are using the client name
    const createSettings = new this.discountModel(createDiscountsDTO);
    return createSettings.save();
  }

  async findAll(): Promise<SettingsDiscountInterface[]> {
    return this.discountModel.find().exec();
  }
  async findOne(id: string): Promise<SettingsDiscountInterface> {
    return this.discountModel.findOne({ _id: id });
  }
  async findOneByClientRules(
    client: string,
    rules?: string,
  ): Promise<SettingsDiscountInterface> {
    return await this.discountModel
      .findOne({
        client,
        rules,
        left_discounts_tickets: { $gt: 0 },
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async decrementLeftDiscountsTickets(
    id: string,
  ): Promise<SettingsDiscountInterface> {
    return this.discountModel
      .findByIdAndUpdate(
        id,
        { $inc: { left_discounts_tickets: -1 } }, // Decrement left_discounts_tickets by 1
      )
      .exec();
  }
}
