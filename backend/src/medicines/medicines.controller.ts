import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Logger,
  HttpException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto, MedicineDto, UpdateMedicineDto } from '@clinic-application/shared';

@ApiTags('medicines')
@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'create medicine successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to create medicine' })
  async create(@Body() createMedicineDto: CreateMedicineDto): Promise<MedicineDto> {
    try {
      return this.medicinesService.create(createMedicineDto);
    } catch (error) {
      Logger.error(`Failed to create medicine: ${error}`);
      throw new HttpException(`Failed to create medicine: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'get medicine successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to get medicine' })
  async findOne(@Param('id') id: number): Promise<MedicineDto> {
    try {
      return this.medicinesService.findOne(+id);
    } catch (error) {
      Logger.error(`Failed to get medicine: ${error}`);
      throw new HttpException(`Failed to get medicine: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'update medicine successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to update medicine' })
  async update(
    @Param('id') id: number,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ): Promise<MedicineDto> {
    try {
      return this.medicinesService.update(+id, updateMedicineDto);
    } catch (error) {
      Logger.error(`Failed to update medicine: ${error}`);
      throw new HttpException(`Failed to update medicine: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'delete medicine successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'delete to update medicine' })
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return this.medicinesService.remove(+id);
    } catch (error) {
      Logger.error(`Failed to delete medicine: ${error}`);
      throw new HttpException(`Failed to delete medicine: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
