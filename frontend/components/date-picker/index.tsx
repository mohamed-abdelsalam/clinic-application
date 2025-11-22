'use client';

import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { DayFormat, ToDate } from '@clinic-application/shared';

import 'react-day-picker/style.css';

interface DatePickerProps {
  initialDate: string,
  onSelect: (d: string) => void,
  startMonth: string,
  endMonth: string,
  allowedDates?: string[],
}

export default function DatePicker({
  initialDate,
  onSelect,
  startMonth,
  endMonth
}: DatePickerProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(initialDate);

  const DatePickerComponent = (
    <DayPicker
      className='text-black text-sm'
      mode='single'
      captionLayout='dropdown'
      startMonth={ToDate(startMonth)}
      endMonth={ToDate(endMonth)}
      selected={ToDate(selected)}
      defaultMonth={ToDate(selected)}
      onSelect={(selected) => {
        const selectedDate = DayFormat(selected);
        setSelected(selectedDate);
        onSelect(selectedDate);
        setIsExpanded(false);
      }}
    />
  );

  return (
    <div className='flex flex-col gap-3'>
      <div
        className='text-blue-400 hover:text-blue-600'
        onClick={() => setIsExpanded(!isExpanded)}>
        {selected}
      </div>
      {isExpanded && DatePickerComponent}
    </div>
  );
}
// disabled={(date) => !allowedDates.some(d => d.toDateString() === date.toDateString())}