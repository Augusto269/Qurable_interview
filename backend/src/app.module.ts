import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DiscountsController } from './controllers/discounts/discounts.controller';
import { RequestService } from './services/request.service';

@Module({
  imports: [],
  controllers: [AppController, DiscountsController],
  providers: [RequestService],
})
export class AppModule {}
