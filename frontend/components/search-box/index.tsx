'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ResultSet from './result-set';
import { MedicineSearchDto, PatientSearchDto } from '@clinic-application/shared';
import { search } from '@actions/search';

type SearchResult = {
  patients: PatientSearchDto[];
  prescriptions?: any[];
  medicines: MedicineSearchDto[];
};

export default function SearchBox() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query) {
      setResults(null);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      search({ query, filters: [], sortBy: 'last update' })
        .then((results) => {
          setResults(results);
        })
        .catch((error) => {
          setResults(null);
        })
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className='relative w-full max-w-md'>
      <input
        type='text'
        placeholder='Search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500'
      />
      {query && results && (
        <div className='absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-auto'>
          {loading && <div className='p-3 text-gray-400'>Searching...</div>}
          {!loading && (
            <>
            <ResultSet resultType='patient' results={results.patients} query={query} />
            {results.prescriptions && <ResultSet resultType='prescription' results={results.prescriptions} query={query} />}
            <ResultSet resultType='medicine' results={results.medicines} query={query} />
            </>
          )}
        </div>
      )}
    </div>
  );
};
