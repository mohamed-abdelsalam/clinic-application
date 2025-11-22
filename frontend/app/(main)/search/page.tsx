'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Filter, SearchDto, SortOption } from '@clinic-application/shared';
import FilterBar from '@components/fliter-bar';
import SortBar from '@components/sort-bar';
import PaginationBar from '@components/pagination-bar';
import { search } from '@actions/search';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const initialFilters = (searchParams.has('filters') ? searchParams.get('filters').split(',') : [] ) as Filter[];
  const [results, setResults] = useState<SearchDto>();
  const [filters, setFilters] = useState<Filter[]>(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>((searchParams.has('sortBy') ? searchParams.get('sortBy') : '') as SortOption);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!query) return;
    search({
      filters: filters,
      query,
      sortBy,
      page: currentPage,
    }).then((results) => {
      setResults(results);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setIsLoading(false);
    });
    const urlSearchParams = new URLSearchParams(searchParams);
    if (filters.length === 0) {
      urlSearchParams.delete('filters');
    } else {
      urlSearchParams.set('filters', filters.join(','));
    }
    if (sortBy) {
      urlSearchParams.set('sortBy', sortBy);
    } else {
      urlSearchParams.delete('sortBy');
    }

    router.push(`/search?${urlSearchParams.toString()}`);
  }, [query, filters, sortBy]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center text-4xl text-gray-500'>
        Loading...
      </div>
    );
  }

  return (
    <div className='flex flex-row gap-2'>
      <div className='flex flex-col w-9/12 h-screen'>
        <div className='border shadow-sm'>
          {results.patients.length > 0 && (
            <div>
              <h2 className='text-2xl font-semibold mb-2'>Prescriptions</h2>
              {results.patients.map((patientSearch) => (
                <Link href={`patient/${patientSearch.id}`}>
                  <div className='border text-xl'>
                    {patientSearch.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
          {/* {results.prescriptions.length > 0 && (
            <div>
              <h2 className='text-2xl font-semibold mb-2'>Prescriptions</h2>
              {results.prescriptions.map((prescription) => (
                <Link href={`prescription/${prescription.id}`}>
                  <div className='border text-xl'>
                    Prescription for: {prescription.patientName}
                  </div>
                </Link>
              ))}
            </div>
          )} */}
          {results.medicines.length > 0 && (
            <div>
              <h2 className='text-2xl font-semibold mb-2'>Medicines</h2>
              {results.medicines.map((medicine) => (
                <Link href={`medicine/${medicine.id}`}>
                  <div className='border text-xl'>
                    Medicine {medicine.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className='flex justify-center'>
          <PaginationBar currentPage={currentPage} totalPages={10} />
        </div>
      </div>
      <div className='flex flex-col h-fit w-3/12 gap-2'>
        <div className='border shadow-sm'>
          <FilterBar title='Filter By' options={['patient', 'prescription', 'medicine']} selected={filters} setSelected={setFilters} />
        </div>
        <div className='border shadow-sm'>
          <SortBar title='Sort By' options={['relevence', 'name', 'last update']} selected={sortBy} setSelected={setSortBy} />
        </div>
      </div>
    </div>
  );
}