import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { databaseProviders } from './providers/database.providers';
import { SettingsDiscountInterface } from './schemas/settings/settings.schema';
import { Model } from 'mongoose';
import { SettingsDiscountProviders } from './schemas/settings/settings.providers';
import { SettingsDiscountsService } from './services/databasServices/settings.service';
import {
  Discounts,
  DiscountsInterface,
} from './schemas/discounts/discounts.schema';
import { DiscountsProviders } from './schemas/discounts/discounts.providers';
import { TypeOfRules } from './controllers/settings/settings.create-discounts-rules.dio';

@Module({
  providers: [
    ...databaseProviders,
    ...SettingsDiscountProviders,
    SettingsDiscountsService,
    ...DiscountsProviders,
  ],
  exports: [...databaseProviders],
})
export class DatabaseModule implements OnModuleInit {
  constructor(
    @Inject('SETTINGS_DISCOUNTS_MODEL')
    private readonly settingsDiscountModel: Model<SettingsDiscountInterface>,

    @Inject('DISCOUNTS_MODEL')
    private readonly discountsModel: Model<DiscountsInterface>,
  ) {}
  // Is not a good practice to use async on the constructor method but is only for testing examples

  async onModuleInit() {
    console.log('DatabaseModule initialized');
    if (process.env.NODE_ENV === 'development') {
      const settingsExists = await this.settingsDiscountModel.findOne({
        client: 'qurable_merchant',
      });

      if (!settingsExists) {
        const newSettings = await this.settingsDiscountModel.create({
          client: 'qurable_merchant',
          max_discounts_tickets: 2,
          type: 'all',
          rules: TypeOfRules.purchase,
        });

        await this.settingsDiscountModel.create({
          client: 'qurable_merchant',
          max_discounts_tickets: 2,
          type: 'all',
          rules: TypeOfRules.new_user,
        });
        console.log('SettingsDiscount document created');

        await this.discountsModel.create({
          settings_id: newSettings._id,
          client: newSettings.client,
          percentage: 10,
          coupon_discount: '10OFF0',
          type: 'all',
        });
        await this.discountsModel.create({
          settings_id: newSettings._id,
          client: newSettings.client,
          percentage: 20,
          coupon_discount: '20OFF0',
          type: 'all',
        });
        console.log('Discount document created');
      }
    }
  }
}
