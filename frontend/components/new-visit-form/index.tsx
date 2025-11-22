'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import AbstractFormContainer from '@components/abstract-form-container';
import SelectInput from '@components/select-input';
import DatePicker from '@components/date-picker';
import { createVisit } from '@actions/visit';
import { VisitType, DayFormat, VisitDto } from '@clinic-application/shared';
import Finder from '@components/finder';

interface NewVisitFormProps {
  isEmbedded?: boolean;
  givenPatientId?: number;
  handleCancel?: () => void;
  handleCreate?: (visitDto: VisitDto) => void;
}

export default function NewVisitForm({ isEmbedded, givenPatientId, handleCancel, handleCreate }: NewVisitFormProps) {
  const router = useRouter();
  const [patientId, setPatient] = useState<number>(givenPatientId);
  const [branch, setBranch] = useState<string>();
  const [date, setDate] = useState<string>(DayFormat(new Date()));
  const [type, setType] = useState<VisitType>('Examination');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createVisit({
      patientId,
      branch,
      date,
      type
    })
    .then((visit) => {
      if (isEmbedded) {
        handleCreate(visit);
      } else {
        router.push(`/visit/${visit.id}`);
      }
    })
    .catch((error) => {
      toast.error(`Failed to create a visit ${error}`);
    })
  };

  return (
    <AbstractFormContainer
      title='New Visit'
      handleSubmit={handleSubmit}
    >
      {!isEmbedded && (<div>Patient</div>)}
      {!isEmbedded && (<Finder entityType='patient' onSelect={setPatient} onDeselect={() => setPatient(null)} />)}
      <div>Branch</div>
      <SelectInput<string>
        options={['October', 'Dokki']}
        selected={branch}
        setSelected={setBranch}
      />
      <div>Visit Date</div>
      <DatePicker
        initialDate={DayFormat(new Date())}
        startMonth={'2025-10-01'}
        endMonth={'2025-12-01'}
        onSelect={setDate}
        allowedDates={['2025-10-30']}
      />
      <div>Visit Type</div>
      <SelectInput<VisitType>
        options={['Examination', 'Consultation']}
        selected={type}
        setSelected={setType}
      />
      {isEmbedded && (<div className='flex flex-row gap-x-2'>
        <button
          className='w-full py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800'
          onClick={(event) => {
            event.preventDefault();
            handleCancel();
          }}
        >
          Cancel
        </button>
        <button
          type='submit'
          className='w-full py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800'
        >
          Save
        </button>
      </div>)}
      {!isEmbedded && (<div>
        <button
          type='submit'
          className='w-full py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800'
        >
          Save
        </button>
        </div>)}
    </AbstractFormContainer>
  );
}