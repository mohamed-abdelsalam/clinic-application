'use client';

import Link from 'next/link';
import { VisitDto } from '@clinic-application/shared';

export interface VisitEntryProps {
  visit: VisitDto;
}

export default function VisitEntry({ visit }: VisitEntryProps) {
  return (
    <Link href={`/visit/${visit.id}`}>
      <div className='text-blue-400 hover:text-blue-700 text-lg border hover:shadow-md'>
        {visit.branch}: [{visit.date}] - [{visit.type}]
      </div>
    </Link>
  );
}