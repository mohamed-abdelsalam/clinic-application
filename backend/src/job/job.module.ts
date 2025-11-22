import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [SearchModule],
  providers: [JobService],
  exports: [JobService]
})
export class JobModule {}
