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
import {
  CopyToPatientRequest,
  CreatePrescriptionDto,
  PrescriptionDto,
  UpdatePrescriptionDto
} from '@clinic-application/shared';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createPrescriptionDto: CreatePrescriptionDto): Promise<PrescriptionDto> {
    try {
      return this.prescriptionsService.create(createPrescriptionDto);
    } catch (error) {
      Logger.error(`Failed to create prescription: ${error}`);
      throw new HttpException(`Failed to create prescription: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/visit/:visitId')
  @HttpCode(HttpStatus.OK)
  async findAllByVisit(@Param('visitId') visitId: number): Promise<PrescriptionDto[]> {
    try {
      return this.prescriptionsService.findAllByVisit(+visitId);
    } catch (error) {
      Logger.error(`Failed to get prescriptions: ${error}`);
      throw new HttpException(`Failed to get prescriptions: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/:id/copy')
  @HttpCode(HttpStatus.OK)
  async copyToPatient(@Param('id') id: number, @Body() copyToPatientRequest: CopyToPatientRequest): Promise<PrescriptionDto> {
    try {
      return this.prescriptionsService.copyToPatient(+id, copyToPatientRequest.patientId);
    } catch (error) {
      Logger.error(`Failed to copy prescriptions: ${error}`);
      throw new HttpException(`Failed to copy prescriptions: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number): Promise<PrescriptionDto> {
    try {
      return this.prescriptionsService.findOne(+id);
    } catch (error) {
      Logger.error(`Failed to get prescription: ${error}`);
      throw new HttpException(`Failed to get prescription: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ): Promise<PrescriptionDto> {
    try {
      return this.prescriptionsService.update(+id, updatePrescriptionDto);
    } catch (error) {
      Logger.error(`Failed to update prescription: ${error}`);
      throw new HttpException(`Failed to update prescription: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: number): Promise<void> {
    try {
      this.prescriptionsService.remove(+id);
    } catch (error) {
      Logger.error(`Failed to delete prescription: ${error}`);
      throw new HttpException(`Failed to delete prescription: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
