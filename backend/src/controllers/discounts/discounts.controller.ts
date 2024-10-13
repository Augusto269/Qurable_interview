import {
  Controller,
  Get,
  HttpCode,
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
import { RequestService } from 'src/services/request.service';
import { GetDiscounts } from './discounts.get-discounts.dio';
import { UnprocessableEntityResponse } from 'src/commons/UnprocessableEntityResponse';
import { GetDiscountsResponseType } from './SwaggerModels/DiscountsResponse';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly requestService: RequestService) {}

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  @ApiHeader(AuthGuard)
  @ApiUnprocessableEntityResponse({ type: UnprocessableEntityResponse })
  @ApiCreatedResponse({ type: GetDiscountsResponseType })
  public async getDiscounts(@Param(new ValidationPipe()) { id }: GetDiscounts) {
    try {
      console.log('id', id);

      return;
      ('ok');
    } catch (err) {}
  }
}
