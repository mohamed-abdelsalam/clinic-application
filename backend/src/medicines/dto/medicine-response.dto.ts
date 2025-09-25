import { Medicine } from '@medicines/entities/medicine.entity';
import { ApiProperty } from '@nestjs/swagger';

export class MedicineResponseDto {
  @ApiProperty({ example: '1234-234ok-44kc'})
  id: string;

  @ApiProperty({ example: 'Medicine' })
  name: string;

  @ApiProperty({ example: 'genericName' })
  genericName: string;

  @ApiProperty({ example: [ 'activeSubstance-1', 'activeSubstance-2'] })
  activeSubstances: string[];
  
  @ApiProperty({ example: [ 'mg' ] })
  strengthUnit: string;
  
  @ApiProperty({ example: [ '1', '0.2', '5'] })
  strengthValues: string[];
  
  @ApiProperty({ example: [ 'dosageInstruction-1', 'dosageInstruction-2', 'dosageInstruction-3'] })
  dosageInstructions: string[];
  
  @ApiProperty({ example: 5 })
  maxDailyDose: number;

  @ApiProperty({ example: [ 'sideEffect-1', 'sideEffect-2', 'sideEffect-3'] })
  sideEffects: string[];
  
  @ApiProperty({ example: [ 'indication-1', 'indication-2', 'indication-3'] })
  indications: string[];

  static fromEntity(medicine: Medicine): MedicineResponseDto {
    return {
      id: medicine.id,
      name: medicine.name,
      genericName: medicine.genericName,
      activeSubstances: medicine.activeSubstances,
        strengthUnit: medicine.strengthUnit,
        strengthValues: medicine.strengthValues,
        dosageInstructions: medicine.dosageInstructions,
        maxDailyDose: medicine.maxDailyDose,
        sideEffects: medicine.sideEffects,
        indications: medicine.indications,
    }
  }
}