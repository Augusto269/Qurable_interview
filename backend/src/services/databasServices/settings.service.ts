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
    const createSettings = new this.discountModel(createDiscountsDTO);
    return createSettings.save();
  }

  async findAll(): Promise<SettingsDiscountInterface[]> {
    return this.discountModel.find().exec();
  }
  async findOne(id: string): Promise<SettingsDiscountInterface> {
    return this.discountModel.findOne({ _id: id });
  }
}
