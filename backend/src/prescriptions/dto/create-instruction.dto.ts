import { ApiProperty } from '@nestjs/swagger';

export class CreateInstructionDto {
  @ApiProperty({ example: '12303-303-20393'})
  medicineId: string;

  @ApiProperty({ example: ['2 times daily', '3 times daily'] })
  description: string[];
}