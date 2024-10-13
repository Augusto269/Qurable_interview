import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  min,
  MinLength,
} from 'class-validator';

export enum TypeOfDiscount {
  all = 'all',
  shoes = 'shoes',
  shirt = 'shirt',
  pants = 'pants',
}
export enum TypeOfRules {
  new_user = 'new_user',
  purchase = 'purchase',
  //TBD More rules?
}

export class SettingsCreateDiscountsRulesDto {
  @IsString()
  @Expose()
  @ApiProperty({
    description: `Client Identification Id`,
    type: 'string',
    maxLength: 4,
    minLength: 50,
    example: 'qurable_merchant',
  })
  client: string;

  @IsNumber()
  @Min(1)
  @Max(5000)
  @Expose()
  @ApiProperty({
    description: `Max amount of tickets that can be discounted`,
    type: 'number',
    maxLength: 1,
    minLength: 5000,
    example: 30,
  })
  max_discounts_tickets: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  @Expose()
  @ApiProperty({
    description: `Percentage of the discount`,
    type: 'number',
    maxLength: 1,
    minLength: 100,
    example: 5,
  })
  percentage: number;

  @IsString()
  @IsEnum(TypeOfDiscount) //TBD all the types can be a array of strings for more flexibility
  @Expose()
  @ApiProperty({
    description: `Type of products that can be discounted`,
    type: 'string',
    maxLength: 4,
    minLength: 50,
    example: TypeOfDiscount.all,
  })
  type: TypeOfDiscount;

  @IsString()
  @IsEnum(TypeOfRules)
  @IsOptional()
  @Expose()
  @ApiProperty({
    description: `Type of rules can be applied to the discount`,
    type: 'string',
    maxLength: 4,
    minLength: 50,
    example: TypeOfRules.new_user,
  })
  rules?: TypeOfRules;

  @IsString()
  @MinLength(6)
  @MaxLength(6)
  @Expose()
  @ApiProperty({
    description: `Cupon discount`,
    type: 'string',
    maxLength: 6,
    minLength: 6,
    example: 'qurable_merchant',
  })
  coupon_discount: string;
}
