import { Module } from '@nestjs/common';
import { DiscountsController } from './controllers/discounts/discounts.controller';
import { RequestService } from './services/request.service';
import { DatabaseModule } from './database.module';
import { databaseProviders } from './providers/database.providers';
import { SettingsController } from './controllers/settings/settings.controller';
import { DiscountsService } from './services/databasServices/disocunt.services';
import { SettingsDiscountsService } from './services/databasServices/settings.service';
import { MerchantService } from './services/databasServices/merchant.service';
import { MerchantProviders } from './schemas/merchants/merchant.providers';
import { SettingsDiscountProviders } from './schemas/settings/settings.providers';
import { DiscountsProviders } from './schemas/discounts/discounts.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [DiscountsController, SettingsController],
  providers: [
    RequestService,
    MerchantService,
    ...MerchantProviders,
    DiscountsService,
    ...DiscountsProviders,
    SettingsDiscountsService,
    ...SettingsDiscountProviders,
    ...databaseProviders,
  ],
})
export class AppModule {}
