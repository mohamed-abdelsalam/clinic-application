import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Logger,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { CreatePatientDto, PatientDto, UpdatePatientDto } from '@clinic-application/shared';

@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'create patient successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to create patient' })
  async create(@Body() createPatientDto: CreatePatientDto): Promise<PatientDto> {
    try {
      return this.patientsService.create(createPatientDto);
    } catch (error) {
      Logger.error(`Failed to create new patient with error: ${error}`);
      throw new HttpException(
        `Failed to create new patient with error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'find patients successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to find patients' })
  async find(): Promise<PatientDto[]> {
    try {
      return await this.patientsService.find();
    } catch (error) {
      Logger.error(`Failed to get patients with error: ${error}`);
      throw new HttpException(
        `Failed to get patients with error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'find patient successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to find patient' })
  async findOne(@Param('id') id: number): Promise<PatientDto> {
    try {
      return await this.patientsService.findOne(+id);
    } catch (error) {
      Logger.error(`Failed to get patient with error: ${error}`);
      throw new HttpException(
        `Failed to get patient with error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'update patient successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to update patient' })
  async update(@Param('id') id: number, @Body() updatePatientDto: UpdatePatientDto): Promise<PatientDto> {
    try {
      return await this.patientsService.update(+id, updatePatientDto);
    } catch (error) {
      Logger.error(`Failed to update patient with error: ${error}`);
      throw new HttpException(
        `Failed to update patient with error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'delete patient successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to delete patient' })
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.patientsService.remove(+id);
    } catch (error) {
      Logger.error(`Failed to delete patient with error: ${error}`);
      throw new HttpException(
        `Failed to delete patient with error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
