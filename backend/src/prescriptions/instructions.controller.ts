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
import { InstructionsService } from './instructions.service';
import {
  CreateInstructionDto,
  InstructionDto,
  UpdateInstructionDto
} from '@clinic-application/shared';

@ApiTags('instructions')
@Controller('instructions')
export class InstructionsController {
  constructor(private readonly instructionsService: InstructionsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'create instruction successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to create instruction' })
  async create(@Body() createInstructionDto: CreateInstructionDto): Promise<InstructionDto> {
    try {
      return this.instructionsService.create(createInstructionDto);
    } catch (error) {
      Logger.error(`Failed to create prescription: ${error}`);
      throw new HttpException(`Failed to create prescription: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/prescription/:prescriptionId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'get instructions successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to get instructions' })
  findAllByPrescription(@Param('prescriptionId') prescriptionId: number): Promise<InstructionDto[]> {
    try {
      return this.instructionsService.findAllByPrescription(+prescriptionId);
    } catch (error) {
      Logger.error(`Failed to get instructions: ${error}`);
      throw new HttpException(`Failed to get instructions: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'get instruction successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to get instruction' })
  async findOne(@Param('id') id: number): Promise<InstructionDto> {
    try {
      return this.instructionsService.findOne(+id);
    } catch (error) {
      Logger.error(`Failed to get instruction: ${error}`);
      throw new HttpException(`Failed to get instruction: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'update instruction successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to update instruction' })
  async update(
    @Param('id') id: number,
    @Body() updateInstructionDto: UpdateInstructionDto,
  ): Promise<InstructionDto> {
    try {
      return this.instructionsService.update(+id, updateInstructionDto);
    } catch (error) {
      Logger.error(`Failed to update instruction: ${error}`);
      throw new HttpException(`Failed to update instruction: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'delete instruction successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'unable to delete instruction' })
  async remove(@Param('id') id: number): Promise<void> {
    try {
      this.instructionsService.remove(+id);
    } catch (error) {
      Logger.error(`Failed to delete instruction: ${error}`);
      throw new HttpException(`Failed to delete instruction: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
