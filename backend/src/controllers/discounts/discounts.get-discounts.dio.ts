import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, Matches } from 'class-validator';

export class GetDiscounts {
  @IsString()
  @IsOptional()
  @Matches(/^[A-Z0-9]+$/, {
    message: 'coupon_discount must be alphanumeric and uppercase',
  })
  @Expose()
  @ApiProperty({
    description: `Identifier of Discounts`,
    type: 'string',
    maxLength: 6,
    minLength: 6,
    example: 'A1S2D3',
  })
  id: string;
}
