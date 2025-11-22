'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PatientDto, PrescriptionDto } from '@clinic-application/shared';
import { getPrescription } from '@actions/prescription';
import InstructionList from '@components/instruction-list';
import { getPatient } from '@actions/patient';
import { getVisit } from '@actions/visit';

export default function PrescriptionPage() {
  const { id } = useParams() as { id: string };
  
  const [prescription, setPrescription] = useState<PrescriptionDto>();
  const [patient, setPatient] = useState<PatientDto>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const prepareData = async () => {
      try {
        const prescription = await getPrescription(+id);
        const visit = await getVisit(prescription.visitId);
        const patient = await getPatient(visit.patientId);
        setPatient(patient);
        setPrescription(prescription);
        setIsLoading(false);
      } catch (error) {
        toast.error(`Failed to load prescription data ${error}`);
      }
    };
    prepareData();
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
    <div className='border flex flex-col gap-2'>
      <h1 className='text-xl'>Prescription</h1>
      <p>Patient Name: {patient.name}</p>
      <h2 className='text-lg'>Header Notes</h2>
      <div className='ml-2'>
        {prescription.headerNotes.map((note, index) => (<div key={`header-note-${index}`}>{note}</div>))}
      </div>
      {
        prescription.instructions && (
          <div>
            <h2 className='text-lg'>Instructions</h2>
            <InstructionList instructionList={prescription.instructions} />
          </div>
        )
      }
      <h2 className='text-lg'>Footer Notes</h2>
      <div className='ml-2'>
        {prescription.footerNotes.map((note, index) => (<div key={`footer-note-${index}`}>{note}</div>))}
      </div>
    </div>
    <div className='flex flex-row-reverse gap-2'>
      <button className='border rounded-l bg-green-400 p-2'>Print</button>
      <button className='border rounded-l bg-blue-400 p-2'>Copy To Patient</button>
      <button className='border rounded-l bg-blue-400 p-2'>Edit</button>
    </div>
   </div>
  );
}