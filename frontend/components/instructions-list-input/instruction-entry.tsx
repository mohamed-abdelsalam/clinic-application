'use client';

import { useState } from 'react';
import Finder from '@components/finder';

interface InstructionEntryProps {
  index: number;
  onRemove: (index: number) => void;
  onChange: (index: number, field: 'strengthValue' | 'description' | 'medicineId', value: string | number) => void;
}

export default function InstructionEntry({ index, onRemove, onChange }: InstructionEntryProps) {
  const [strengthValue, setStrengthValue] = useState<string>();
  const [notes, setNotes] = useState<string>();

  return (
    <div
      key={`instruction-${index}`}
      className='grid grid-cols-1 md:grid-cols-3 gap-4 items-start border p4 rounded-lg bg-gray-50 relative'
    >
      <Finder
        entityType='medicine'
        onSelect={(medicineId) => (onChange(index, 'medicineId', medicineId))}
        onDeselect={() => {}}
      />
      <input
        type='text'
        value={strengthValue}
        onChange={(e) => {
          setStrengthValue(e.target.value);
          onChange(index, 'strengthValue', e.target.value);
        }}
        className='w-full rounded-lg p-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        placeholder='Strength Value'
      />
      <input
        type='text'
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
          onChange(index, 'description', e.target.value);
        }}
        className='w-full rounded-lg p-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        placeholder='description'
      />
      {index >= 1 && (
        <button
          type='button'
          onClick={() => onRemove(index)}
          className='absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm'
        >X</button>
      )}
    </div>
  );
}