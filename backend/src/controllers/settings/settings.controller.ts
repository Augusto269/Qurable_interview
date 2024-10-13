import {
  Body,
  Controller,
  Get,
  HttpCode,
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
import { RequestService } from 'src/services/request.service';
import { UnprocessableEntityResponse } from 'src/commons/UnprocessableEntityResponse';
import { SettingsCreateResponseType } from './SwaggerModels/SettingsResponse';
import { SettingsCreateDiscountsRulesDto } from './settings.create-discounts-rules.dio';

@Controller('settings')
export class SettingsController {
  constructor(private readonly requestService: RequestService) {}

  @Post('discounts')
  @UseGuards(AuthGuard)
  @HttpCode(201)
  @ApiHeader(AuthGuard)
  @ApiUnprocessableEntityResponse({ type: UnprocessableEntityResponse })
  @ApiCreatedResponse({ type: SettingsCreateResponseType })
  public async createMerchantDiscountSettings(
    @Body(new ValidationPipe())
    SettingsCreateDiscountsBody: SettingsCreateDiscountsRulesDto,
  ) {
    try {
      console.log('id', SettingsCreateDiscountsBody);

      return;
      ('ok');
    } catch (err) {}
  }
}
