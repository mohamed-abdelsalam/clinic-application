'use client';

import { useEffect, useState } from 'react';
import { MedicineSearchDto, PatientSearchDto } from '@clinic-application/shared';
import { searchMedicine, searchPatient } from '@actions/search';

interface FinderProps {
  entityType: 'patient' | 'medicine';
  onSelect: (id: number) => void;
  onDeselect: () => void;
}

export default function Finder({entityType, onSelect, onDeselect}: FinderProps) {
  const [query, setQuery] = useState<string>();
  const [results, setResults] = useState<MedicineSearchDto[] | PatientSearchDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [itemSelected, setItemSelected] = useState<MedicineSearchDto | PatientSearchDto>();

  const Deselect = (
    <button
      className='rounded-r-lg text-xl p-2 bg-gray-300 text-red-300 hover:text-red-400'
      onClick={(e) => {
        e.preventDefault();
        setItemSelected(null);
        setQuery('');
        onDeselect();
    }}>X</button>
  );

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      if (entityType === 'medicine') {
        setResults(await searchMedicine(query));
      } else {
        setResults(await searchPatient(query));
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className='relative w-full max-w-md'>
      <div className='flex items-center border border-gray-300 rounded-lg'>
        <input
          type='text'
          placeholder='Search'
          value={itemSelected?.name || query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full px-4 py-2 rounded-lg focus:border-blue-500 text-sm'
        />
        {itemSelected && Deselect}
      </div>
      {query && !itemSelected && results && (
        <div className='absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-auto'>
          {loading && <div className='p-3 text-gray-400'>Searching...</div>}
          {!loading && (<div className='border rounded-sm flex flex-col'>
            {
              results.map((result: PatientSearchDto | MedicineSearchDto, index: number) => {
                return (
                  <div
                    className='text-black px-2 font-semibold cursor-pointer w-full hover:bg-gray-300'
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setItemSelected(result);
                      onSelect(result.id);
                    }}
                  >
                    {result.name}
                  </div>
                );
              })
            }
          </div>)}
        </div>
      )}
    </div>
  );
}