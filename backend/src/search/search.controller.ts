import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get('/medicine')
  async searchMedicine(@Query('query') query: string, @Query('sort') sort: string = 'updatedAt:desc') {
    return this.searchService.searchMedicine(query, [], [sort]);
  }

  @Get('/patient')
  async searchPatient(@Query('query') query: string, @Query('sort') sort: string = 'updatedAt:desc') {
    return this.searchService.searchPatient(query, [], [sort]);
  }
}
