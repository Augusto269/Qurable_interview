import { ApiProperty } from '@nestjs/swagger';

export class SettingsCreateResponseType {
  @ApiProperty({ description: 'Type of the refund', example: 'all' })
  type: string;

  @ApiProperty({ description: 'Amount of the refund', example: '4' })
  amount: number;
}
