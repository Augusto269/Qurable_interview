import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsString,
  IsArray,
  IsCreditCard,
  IsInt,
  Length,
  Min,
  Max,
  MinLength,
  MaxLength,
  ArrayNotEmpty,
  Matches,
  IsOptional,
} from 'class-validator';

export class PaymentCreateDto {
  @IsEmail()
  @Expose()
  @ApiProperty({
    description: 'Email of the user making the purchase',
    type: 'string',
    example: 'augusto@testings.com',
  })
  user: string;

  @IsNumber()
  @Min(0.01)
  @Expose()
  @ApiProperty({
    description: 'Total amount of the purchase',
    type: 'number',
    example: 123.3,
  })
  amount: number;

  @IsString()
  @IsOptional()
  @Matches(/^[A-Z0-9]+$/, {
    message: 'coupon_discount must be alphanumeric and uppercase',
  })
  @MinLength(6)
  @MaxLength(6)
  @Expose()
  @ApiProperty({
    description: 'Discount coupon code',
    type: 'string',
    maxLength: 6,
    minLength: 6,
    example: 'A2AB1A',
  })
  coupon_discount?: string;

  @MinLength(16)
  @MaxLength(19)
  @IsString()
  @Expose()
  @ApiProperty({
    description: 'Credit card number',
    type: 'string',
    example: '4242424242424242',
  })
  card_number: string;

  @IsInt()
  @Min(100)
  @Max(999)
  @Expose()
  @ApiProperty({
    description: 'CVV of the credit card',
    type: 'number',
    example: 123,
  })
  cvv: number;

  @IsString()
  @Length(4) // MM/YY format
  @Expose()
  @ApiProperty({
    description: 'Expiration date of the credit card',
    type: 'string',
    example: '12/33',
  })
  expirate_day: string;

  @IsArray()
  @ArrayNotEmpty()
  @Expose()
  @ApiProperty({
    description: 'List of product IDs',
    type: [String],
    example: ['123', '1', '2'],
  })
  products_id: string[];

  @IsString()
  @Expose()
  @ApiProperty({
    description: 'Client identification ID',
    type: 'string',
    example: 'qurable_merchant',
  })
  client: string;
}
