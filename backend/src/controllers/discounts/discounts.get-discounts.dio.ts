import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class GetDiscounts {
  @IsString()
  @IsOptional()
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
