import { ApiProperty } from '@nestjs/swagger';

export class UnprocessableEntityResponse {
  @ApiProperty({
    description: 'Error message',
    example: 'Invalid request data',
  })
  message: string;

  @ApiProperty({
    description: 'Details about the error',
    example: 'Validation failed for the id field',
  })
  details?: string;
}
