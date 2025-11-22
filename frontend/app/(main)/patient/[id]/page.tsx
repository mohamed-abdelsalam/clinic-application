'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { PatientDto, UpdatePatientDto } from '@clinic-application/shared';
import { getPatient, updatePatient } from '@actions/index';
import PersonalInfoCard from '@components/personal-info-card';
import PatientVisitsCard from '@components/patient-visits-card';

export default function PatientPage() {
  const { id } = useParams() as { id: string };
  const [patient, setPatient] = useState<PatientDto>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSave = (updatePatientDto: UpdatePatientDto) => {
    updatePatient(patient.id, updatePatientDto)
      .then((pateintDto) => {
        setPatient({...patient,
          name: pateintDto.name,
          dateOfBirth: pateintDto.dateOfBirth,
          gender: pateintDto.gender,
          email: pateintDto.email,
          phone: pateintDto.phone,
          job: pateintDto.job
        });
        toast.success('Patient updated', { duration: 2500 });
      })
      .catch((error) => {
        toast.error(`Failed to update patient ${error}`, { duration: 2500 });
      });
  }

  useEffect(() => {
    getPatient(+id)
      .then((patient) => {
        setPatient(patient);
      })
      .catch((error) => {
        toast.error(`Failed to get patient ${error}`, { duration: 2500 });
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
    <div className='flex flex-row justify-between gap-2'>
      <div className='w-7/12'>
        <PersonalInfoCard patient={patient} onSave={handleSave} />
      </div>
      <div className='border w-5/12 p-2'>
        <PatientVisitsCard patientId={patient.id} />
      </div>
    </div>
    <div className='border p-2'>
      <h1 className='text-xl font-semibold text-gray-700'>Documents</h1>
    </div>
   </div>
  );
}