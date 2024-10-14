import { Model } from 'mongoose';
import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import {
  DiscountsInterface,
  DiscountsInterfaceCreate,
} from 'src/schemas/discounts/discounts.schema';
import { SettingsDiscountsService } from './settings.service';
import { generateCoupon } from 'src/commons/Cupons.helper';

@Injectable()
export class DiscountsService {
  constructor(
    @Inject('DISCOUNTS_MODEL')
    private discountModel: Model<DiscountsInterface>,
    @Inject(forwardRef(() => SettingsDiscountsService))
    private settingsDiscountsService: SettingsDiscountsService,
  ) {}

  async create(
    bodyCreateRules: DiscountsInterfaceCreate,
  ): Promise<DiscountsInterface> {
    const createdCat = new this.discountModel(bodyCreateRules);
    return createdCat.save();
  }

  async findOneByCouponDiscount(coupon: string): Promise<DiscountsInterface> {
    const discount = await this.discountModel.findOne({
      coupon_discount: coupon,
    });
    if (!discount) {
      throw new HttpException('Coupon not exist', HttpStatus.BAD_REQUEST);
    }
    if (discount.usedAt && discount.usedFor) {
      throw new HttpException('Coupon already used', HttpStatus.BAD_REQUEST);
    }
    return discount;
  }
  async findAll(): Promise<DiscountsInterface[]> {
    return this.discountModel.find().exec();
  }
  async findOne(id: string): Promise<DiscountsInterface> {
    return this.discountModel.findOne({ _id: id });
  }
  async applyDiscount(
    coupon_discount: string,
    user?: string,
    client?: string,
  ): Promise<any> {
    const discount = await this.discountModel.findOne({
      coupon_discount: coupon_discount,
    });
    if (!discount) {
      throw new HttpException('Coupon not exist', HttpStatus.BAD_REQUEST);
    }
    if (discount.usedAt && discount.usedFor) {
      throw new HttpException('Coupon already used', HttpStatus.BAD_REQUEST);
    }

    if (discount.user_email && discount.user_email !== user) {
      throw new HttpException(
        'Coupon not valid for this user',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (discount.client && discount.client !== client) {
      throw new HttpException(
        'Coupon not valid for this client',
        HttpStatus.BAD_REQUEST,
      );
    }
    return discount;
  }

  async applyRulesToGenerateDiscountGiftCard(
    user?: string,
    client?: string,
  ): Promise<DiscountsInterfaceCreate | null> {
    //Check if the merchant setup any rules on the discount
    const rulesForMerchant =
      await this.settingsDiscountsService.findOneByClientRules(
        client,
        'purchase',
      );
    if (rulesForMerchant) {
      const discountPayload: DiscountsInterfaceCreate = {
        settings_id: rulesForMerchant._id,
        client: rulesForMerchant.client,
        percentage: rulesForMerchant.percentage,
        coupon_discount: generateCoupon(),
        user_email: user,
        type: rulesForMerchant.type,
      };
      const createdDiscount = new this.discountModel(discountPayload).save();
      if (!createdDiscount) {
        throw new HttpException(
          'Error creating discount',
          HttpStatus.BAD_REQUEST,
        );
      }
      //Decrement the left_discounts_tickets when we create the discount , but we can change this logic to apply this when we used the discount -- TBD
      this.settingsDiscountsService.decrementLeftDiscountsTickets(
        rulesForMerchant._id,
      );
      return createdDiscount;

      //TODO: Implement the logic to apply the discount to the user
    }

    return null;
  }

  async useDiscount(id: string, email: string): Promise<DiscountsInterface> {
    return this.discountModel
      .findByIdAndUpdate(id, {
        $set: {
          used: true,
          usedAt: new Date(), // Set usedAt to the current date
          usedFor: email, // Set usedFor to the provided email
        },
      })
      .exec();
  }
}
