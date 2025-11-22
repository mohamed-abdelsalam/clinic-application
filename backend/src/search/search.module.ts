import { Module } from '@nestjs/common';
import { MeiliSearch } from 'meilisearch';
import { ConfigService } from '@nestjs/config';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  providers: [
    SearchService,
    {
      provide: 'MeiliClient',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const client = new MeiliSearch({
          host: configService.get<string>('MEILISEARCH_HOST'),
        });
        await client.createIndex('medicine', { primaryKey: 'id' });
        await client.index('medicine').updateSortableAttributes(['updatedAt']);
        
        await client.createIndex('patient', { primaryKey: 'id' });
        await client.index('patient').updateSortableAttributes(['updatedAt']);

        return client;
      },
    }
  ],
  controllers: [SearchController],
  exports: [SearchService],
})
export class SearchModule {}
