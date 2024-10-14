import { ApiProperty } from '@nestjs/swagger';

export class PaymentsResponseType {
  @ApiProperty({ description: 'Discount coupoun', example: 'AAA111' })
  coupon_discount?: string;

  @ApiProperty({ description: 'Amount Payed', example: '4' })
  amountPayed: number;
}
