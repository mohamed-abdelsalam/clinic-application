'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { PatientDto } from '@clinic-application/shared';
import { getPatients } from '@actions/patient';

export default function PatientsPage() {
  const [patientList, setPatientList] = useState<PatientDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPatients()
    .then((patients) => setPatientList(patients))
    .catch((error) => toast.error(`Failed to get patients: ${error}`, { duration: 2500 }))
    .finally(() => {
      setIsLoading(false);
    })
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center text-4xl text-gray-500'>
        Loading...
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full gap-2'>
      {patientList.map((patient) => (
        <Link href={`/patient/${patient.id}`}>
          <div className='border bg-gray-50'>
            {patient.id} - {patient.name}
          </div>
        </Link>
      ))}
    </div>
  );
}