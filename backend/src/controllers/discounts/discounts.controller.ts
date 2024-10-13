import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetDiscounts } from './discounts.get-discounts.dio';
import { UnprocessableEntityResponse } from 'src/commons/UnprocessableEntityResponse';
import { GetDiscountsResponseType } from './SwaggerModels/DiscountsResponse';
import { DiscountsService } from 'src/services/databasServices/disocunt.services';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountService: DiscountsService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(201)
  @ApiHeader(AuthGuard)
  @ApiUnprocessableEntityResponse({ type: UnprocessableEntityResponse })
  @ApiCreatedResponse({ type: GetDiscountsResponseType })
  public async getDiscounts(@Param(new ValidationPipe()) { id }: GetDiscounts) {
    try {
      const discount = await this.discountService.findOneByCouponDiscount(id);
      console.log('discount', discount);
      if (!discount) {
        throw new HttpException('Discount not found', HttpStatus.BAD_REQUEST);
      }

      return discount;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        'Error creating discount settings',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
