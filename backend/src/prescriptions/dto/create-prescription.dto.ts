import { ApiProperty } from '@nestjs/swagger';

export class CreatePrescriptionDto {
    @ApiProperty({ example: '1230-203929-191919'})
    visitId: string;

    @ApiProperty({ example: ['take medicine same as explained'] })
    headerNotes: string[];
    
    @ApiProperty({ example: ['drink more water', 'do sports'] })
    footerNotes: string[];
}
