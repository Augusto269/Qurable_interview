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
import { UnprocessableEntityResponse } from 'src/commons/UnprocessableEntityResponse';
import { SettingsCreateResponseType } from './SwaggerModels/SettingsResponse';
import {
  SettingsCreateDiscountsRulesDto,
  TypeOfRules,
} from './settings.create-discounts-rules.dio';
import { MerchantService } from 'src/services/databasServices/merchant.service';
import { SettingsDiscountsService } from 'src/services/databasServices/settings.service';
import { DiscountsInterfaceCreate } from 'src/schemas/discounts/discounts.schema';
import { DiscountsService } from 'src/services/databasServices/disocunt.services';
import { generateCoupon } from 'src/commons/Cupons.helper';

@Controller('settings')
export class SettingsController {
  constructor(
    private readonly merchantService: MerchantService,
    private discountsService: DiscountsService,
    private readonly settingsDiscountsService: SettingsDiscountsService,
  ) {}

  @Post('discounts')
  @UseGuards(AuthGuard)
  @HttpCode(201)
  @ApiHeader(AuthGuard)
  @ApiUnprocessableEntityResponse({ type: UnprocessableEntityResponse })
  @ApiCreatedResponse({ type: SettingsCreateResponseType })
  public async createMerchantDiscountSettings(
    @Body(new ValidationPipe())
    settingsCreateDiscountsBody: SettingsCreateDiscountsRulesDto,
  ) {
    try {
      const merchantUser = await this.merchantService.findOne(
        settingsCreateDiscountsBody.client,
      );
      if (!merchantUser) {
        throw new HttpException('Merchant not found', HttpStatus.BAD_REQUEST);
      }
      if (!settingsCreateDiscountsBody.rules) {
        //Default Rules
        settingsCreateDiscountsBody.rules = TypeOfRules.purchase;
      }

      const newSettingsDiscount = await this.settingsDiscountsService.create(
        settingsCreateDiscountsBody,
      );
      if (!newSettingsDiscount) {
        throw new HttpException(
          'Error creating discount settings',
          HttpStatus.BAD_REQUEST,
        );
      }

      return newSettingsDiscount; // TBD Mapping for user response
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
