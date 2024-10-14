import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
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
import { PaymentCreateDto } from './payments.create.dio';
import { UnprocessableEntityResponse } from 'src/commons/UnprocessableEntityResponse';
import { PaymentsResponseType } from './SwaggerModels/PaymentResponse';
import { PaymentsService } from 'src/services/databasServices/payments.service';
import { ProductService } from 'src/services/databasServices/products.service';
import { DiscountsService } from 'src/services/databasServices/disocunt.services';
import { GatewayService } from 'src/services/databasServices/gateywa.service';
import { DiscountsInterfaceCreate } from 'src/schemas/discounts/discounts.schema';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly productService: ProductService,
    private readonly discountService: DiscountsService,
    private readonly gatewayService: GatewayService,
  ) {}

  @Post('')
  @UseGuards(AuthGuard)
  @HttpCode(201)
  @ApiHeader(AuthGuard)
  @ApiUnprocessableEntityResponse({ type: UnprocessableEntityResponse })
  @ApiCreatedResponse({ type: PaymentsResponseType })
  public async PaymentCreateDto(
    @Body(new ValidationPipe()) paymentBody: PaymentCreateDto,
  ) {
    try {
      let discountDocument;
      if (paymentBody.coupon_discount) {
        discountDocument = await this.discountService.applyDiscount(
          paymentBody.coupon_discount,
          paymentBody.user,
          paymentBody.client,
        );
      }
      const calculateFinalAmount =
        await this.productService.calculateTotalAmount(
          paymentBody.products_id,
          discountDocument,
        );
      const paymentCharge = await this.gatewayService.createCharge({
        ...paymentBody,
        amountToPay: calculateFinalAmount,
      });
      if (!paymentCharge) {
        throw new HttpException(
          'Error creating payment',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (discountDocument) {
        //Deprecate the coupon
        await this.discountService.useDiscount(
          discountDocument._id,
          paymentBody.user,
        );
      }
      const couponDiscount =
        await this.discountService.applyRulesToGenerateDiscountGiftCard(
          paymentBody.coupon_discount,
          paymentBody.user,
          paymentBody.client,
        );
      if (couponDiscount) {
        //Send this couponDiscount to the client to the email asociated to the user
      }

      return {
        amountPayed: calculateFinalAmount, //TB change for the amount payed in the paymentCharge callback response
        coupon_discount: couponDiscount?.coupon_discount,
        percentage_discount: couponDiscount?.percentage,
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.log(err);
      throw new HttpException(
        'Error creating payments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
