export type Filter = 'patient' | 'medicine' | 'prescription' | 'none';

export type SortOption = 'relevence' | 'name' | 'last update';

export interface SearchQuery {
  query: string;
  filters: Filter[];
  sortBy: SortOption;
  page?: number;
}