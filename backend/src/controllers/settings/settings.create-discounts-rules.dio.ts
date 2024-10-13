import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum TypeOfDiscount {
  all = 'all',
  shoes = 'shoes',
  shirt = 'shirt',
  pants = 'pants',
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
  @Expose()
  @ApiProperty({
    description: `Max amount of tickets that can be discounted`,
    type: 'number',
    maxLength: 1,
    minLength: 5000,
    example: 30,
  })
  max_discounts_tickets: number;

  @IsString()
  @IsEnum(TypeOfDiscount) //TBD all the types can be a array of strings for more flexibility
  @IsOptional()
  @Expose()
  @ApiProperty({
    description: `Type of products that can be discounted`,
    type: 'string',
    maxLength: 4,
    minLength: 50,
    example: TypeOfDiscount.all,
  })
  type: TypeOfDiscount;
}
