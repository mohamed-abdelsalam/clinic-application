'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import AbstractFormContainer from '@components/abstract-form-container';
import NotesInput from '@components/notes-input';
import InstructionsListInput from '@components/instructions-list-input';
import { InstructionDto, PatientDto, VisitDto } from '@clinic-application/shared';
import { createPrescription } from '@actions/prescription';
import { useRouter } from 'next/navigation';
import { createInstruction } from '@actions/instruction';
import Finder from '@components/finder';
import { getPatientVisits } from '@actions/visit';
import SelectInput from '@components/select-input';

export default function PrescriptionForm() {
  const router = useRouter();

  const [headerNotes, setHeaderNotes] = useState<string[]>([]);
  const [footerNotes, setFooterNotes] = useState<string[]>([]);
  const [patientId, setPatientId] = useState<number>();
  const [visits, setVisits] = useState<VisitDto[]>();
  const [selectedVisit, setSelectedVisit] = useState<string>();
  const [visitId, setVisitId] = useState<number>();
  const [instructions, setInstructions] = useState<InstructionDto[]>([{
    medicineId: 0,
    description: '',
    prescriptionId: 0,
    id: 0,
    strengthValue: '',
    group: 0,
  }]);

  const VisitSelector = visits && (
    <SelectInput
      options={visits.map((v) => v.date)}
      selected={selectedVisit}
      setSelected={(selected) => {
        const selectedVisit = visits.filter((v) => v.date === selected);
        setVisitId(selectedVisit[0].id);
      }}
    />
  );

  const PatientFinder = (
    <Finder
      entityType='patient'
      onSelect={async (patientId) => {
        setPatientId(patientId);
        setVisits(await (getPatientVisits(patientId)));
      }}
      onDeselect={() => {
        setVisits([]);
        setPatientId(null);
        setSelectedVisit(null);
        setVisitId(null);
      }}
    />
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const prescription = await createPrescription({
        headerNotes,
        footerNotes,
        visitId,
      });
      await Promise.all((instructions.map(async (instruction) => {
        return await createInstruction({
            ...instruction,
            prescriptionId: prescription.id,
          });
      })));
      router.push(`/prescription/${prescription.id}`);
    } catch(error) {
      toast.error(`Failed to create prescription ${error}`);
    }
  };

  return (
    <AbstractFormContainer
      title='Create Prescription'
      handleSubmit={handleSubmit}
    >
      <div>Patient: </div>
      {PatientFinder}
      {VisitSelector}
      <div>Header Notes: </div>
      <NotesInput notes={headerNotes} setNotes={setHeaderNotes} />
      <div>Instructions: </div>
      <InstructionsListInput instructions={instructions} group={0} setInstructions={setInstructions} />
      <div>Footer Notes: </div>
      <NotesInput notes={footerNotes} setNotes={setFooterNotes} />
      <button
        type='submit'
        className='w-full py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-950'
      >
        Save
      </button>
    </AbstractFormContainer>
  );
}