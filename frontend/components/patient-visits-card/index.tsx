'use client';

import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { getPatientVisits } from '@actions/visit';
import { VisitDto } from '@clinic-application/shared';
import NewVisitForm from '@components/new-visit-form';
import VisitEntry from './visit-entry';

export interface PatientVisitsCardProps {
  patientId: number;
}

export default function PatientVisitsCard({ patientId }: PatientVisitsCardProps) {
  const [newVisitClicked, setNewVisitClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visits, setVisits] = useState<VisitDto[]>([]);

  useEffect(() => {
    getPatientVisits(patientId)
    .then((visits) => setVisits(visits))
    .catch((error) => {
      toast.error(`Failed to load patient visits ${error}`);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (<div className='p-3 text-gray-400'>Loading...</div>);
  }
  
  return (
    <div className='flex flex-col justify-between h-auto rounded-lg'>
      <h1 className='text-xl font-semibold text-gray-700 py-2'>Visits</h1>
      <div className='flex flex-col h-64 overflow-auto gap-y-2'>
        {visits.map(visit => (<VisitEntry visit={visit} />))}
      </div>
      {newVisitClicked && (<NewVisitForm isEmbedded={true} givenPatientId={patientId} handleCancel={() => {
        setNewVisitClicked(false);
      }} handleCreate={(visitDto) => {
        setVisits([...visits, visitDto]);
        setNewVisitClicked(false);
      }} />)}
      {
        !newVisitClicked && (<button
        className='mt-4 border bg-green-500 rounded-md hover:bg-green-600 hover:shadow-sm'
        onClick={(event) => {
          event.preventDefault();
          setNewVisitClicked(true);
        }}>New Visit</button>)
      }
    </div>
  );
}