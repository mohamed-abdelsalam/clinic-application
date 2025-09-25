import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ example: 'Mohamed Abdelsalam' })
  name: string;

  @ApiProperty({ example: 'male', enum: ['male', 'female'] })
  gender: string;

  @ApiProperty({ example: '01228934814' })
  phone: string;

  @ApiProperty({ example: 'Eengineer' })
  job: string;

  @ApiProperty({ example: '12-12-1991' })
  dateOfBirth: string;

  @ApiProperty({ example: 'mohamed@domain.com' })
  email?: string;
}
