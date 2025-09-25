import { ApiProperty } from "@nestjs/swagger";

export class CreateVisitDto {
  @ApiProperty({ example: '12340-2339-29192-91919'})
  patientId: string;
  
  @ApiProperty({ example: 'october', enum: ['october', 'dokki'] })
  branch: string;
}
