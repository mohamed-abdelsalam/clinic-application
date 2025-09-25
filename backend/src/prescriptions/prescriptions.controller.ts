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
import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { PrescriptionResponseDto } from './dto/prescription-response.dto';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createPrescriptionDto: CreatePrescriptionDto): Promise<PrescriptionResponseDto> {
    try {
      return this.prescriptionsService.create(createPrescriptionDto);
    } catch (error) {
      Logger.error(`Failed to create prescription: ${error}`);
      throw new HttpException(`Failed to create prescription: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<PrescriptionResponseDto[]> {
    try {
      return this.prescriptionsService.findAll();
    } catch (error) {
      Logger.error(`Failed to get prescriptions: ${error}`);
      throw new HttpException(`Failed to get prescriptions: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<PrescriptionResponseDto> {
    try {
      return this.prescriptionsService.findOne(id);
    } catch (error) {
      Logger.error(`Failed to get prescription: ${error}`);
      throw new HttpException(`Failed to get prescription: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ): Promise<void> {
    try {
      this.prescriptionsService.update(id, updatePrescriptionDto);
    } catch (error) {
      Logger.error(`Failed to update prescription: ${error}`);
      throw new HttpException(`Failed to update prescription: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<void> {
    try {
      this.prescriptionsService.remove(id);
    } catch (error) {
      Logger.error(`Failed to delete prescription: ${error}`);
      throw new HttpException(`Failed to delete prescription: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
