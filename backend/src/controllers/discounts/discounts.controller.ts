import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestService } from 'src/services/request.service';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly requestService: RequestService) {}

  @Get()
  @UseGuards(AuthGuard)
  getHello(): string {
    return this.requestService.getHello();
  }
}
