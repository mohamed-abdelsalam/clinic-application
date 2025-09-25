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
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { VisitResponseDto } from './dto/visit-response.dto';

@ApiTags('visits')
@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'create visit successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to create visit' })
  async create(@Body() createVisitDto: CreateVisitDto): Promise<VisitResponseDto> {
    try {
      return await this.visitsService.create(createVisitDto);
    } catch (error) {
      Logger.error(`Faild to create visit: ${error}`);
      throw new HttpException(`Faild to create visit: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/patient/:patientId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'get visits successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to get visits' })
  async findAllByPatient(@Param('patientId') patientId: string) {
    try {
      return await this.visitsService.findAllByPatient(patientId);
    } catch (error) {
      Logger.error(`Faild to get visits: ${error}`);
      throw new HttpException(`Faild to get visits: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'get visit successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to get visit' })
  async findOne(@Param('id') id: string): Promise<VisitResponseDto> {
    try {
      return await this.visitsService.findOne(id);
    } catch (error) {
      Logger.error(`Faild to get visit: ${error}`);
      throw new HttpException(`Faild to get visit: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'update visit successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to update visit' })
  async update(@Param('id') id: string, @Body() updateVisitDto: UpdateVisitDto): Promise<void> {
    try {
      await this.visitsService.update(id, updateVisitDto);
    } catch (error) {
      Logger.error(`Faild to update visit: ${error}`);
      throw new HttpException(`Faild to update visit: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'delete visit successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to delete visit' })
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.visitsService.remove(id);
    } catch (error) {
      Logger.error(`Faild to delete visit: ${error}`);
      throw new HttpException(`Faild to delete visit: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
