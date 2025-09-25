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
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { MedicineResponseDto } from './dto/medicine-response.dto';


@ApiTags('medicines')
@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'create medicine successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to create medicine' })
  async create(@Body() createMedicineDto: CreateMedicineDto): Promise<MedicineResponseDto> {
    try {
      return this.medicinesService.create(createMedicineDto);
    } catch (error) {
      Logger.error(`Failed to create medicine: ${error}`);
      throw new HttpException(`Failed to create medicine: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'get medicines successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to get medicines' })
  async findAll(): Promise<MedicineResponseDto[]> {
    try {
      return this.medicinesService.findAll();
    } catch (error) {
      Logger.error(`Failed to get medicines: ${error}`);
      throw new HttpException(`Failed to get medicines: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'get medicine successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to get medicine' })
  async findOne(@Param('id') id: string): Promise<MedicineResponseDto> {
    try {
      return this.medicinesService.findOne(id);
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
    @Param('id') id: string,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ): Promise<void> {
    try {
      return this.medicinesService.update(id, updateMedicineDto);
    } catch (error) {
      Logger.error(`Failed to update medicine: ${error}`);
      throw new HttpException(`Failed to update medicine: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'delete medicine successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'delete to update medicine' })
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return this.medicinesService.remove(id);
    } catch (error) {
      Logger.error(`Failed to delete medicine: ${error}`);
      throw new HttpException(`Failed to delete medicine: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
