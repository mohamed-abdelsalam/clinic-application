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
import { CreateVisitDto, UpdateVisitDto, VisitDto } from '@clinic-application/shared';

@ApiTags('visits')
@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'create visit successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to create visit' })
  async create(@Body() createVisitDto: CreateVisitDto): Promise<VisitDto> {
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
  async findAllByPatient(@Param('patientId') patientId: number) {
    try {
      return await this.visitsService.findAllByPatient(+patientId);
    } catch (error) {
      Logger.error(`Faild to get visits: ${error}`);
      throw new HttpException(`Faild to get visits: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'get visit successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to get visit' })
  async findOne(@Param('id') id: number): Promise<VisitDto> {
    try {
      return await this.visitsService.findOne(+id);
    } catch (error) {
      Logger.error(`Faild to get visit: ${error}`);
      throw new HttpException(`Faild to get visit: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'update visit successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to update visit' })
  async update(@Param('id') id: number, @Body() updateVisitDto: UpdateVisitDto): Promise<VisitDto> {
    try {
      return await this.visitsService.update(+id, updateVisitDto);
    } catch (error) {
      Logger.error(`Faild to update visit: ${error}`);
      throw new HttpException(`Faild to update visit: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'delete visit successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to delete visit' })
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.visitsService.remove(+id);
    } catch (error) {
      Logger.error(`Faild to delete visit: ${error}`);
      throw new HttpException(`Faild to delete visit: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
