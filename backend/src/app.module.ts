import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DiscountsController } from './controllers/discounts/discounts.controller';
import { RequestService } from './services/request.service';
import { DatabaseModule } from './database.module';
import { databaseProviders } from './providers/database.providers';
import { SettingsController } from './controllers/settings/settings.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, DiscountsController, SettingsController],
  providers: [RequestService, ...databaseProviders],
})
export class AppModule {}
