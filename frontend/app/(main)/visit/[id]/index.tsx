'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { VisitDto } from '@clinic-application/shared';
import { getVisit } from '@actions/visit';

export default function PatientPage() {
  const { id } = useParams() as { id: string };
  const [visit, setVisit] = useState<VisitDto>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getVisit(+id)
      .then((visit) => {
        setVisit(visit);
      })
      .catch((error) => {
        toast.error(`Failed to load visit ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center text-4xl text-gray-500'>
        Loading...
      </div>
    );
  }
  return (
   <div className='flex flex-col gap-4'>
    <div className='border p-2'>
      <h1 className='text-xl font-semibold text-gray-700'>Documents</h1>
    </div>
   </div>
  );
}