'use client';

import { useEffect, useState } from 'react';
import { InstructionDto, MedicineDto } from '@clinic-application/shared';
import toast from 'react-hot-toast';
import { getMedicine } from '@actions/medicine';

interface InstructionListProps {
  instructionList: InstructionDto[];
}

export default function InstructionList({ instructionList }: InstructionListProps) {
  const [medicineList, setMedicineList] = useState<MedicineDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    Promise.all(instructionList.map(async (instruction) => {
      return await getMedicine(instruction.medicineId);
    }))
    .then((results: MedicineDto[]) => {
      setMedicineList(results);
    })
    .catch((error) => {
      toast.error(`Failed to load medicies ${error}`);
    })
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
    <div className='flex flex-col border gap-2'>
      {
        medicineList.map((medicine, index) => {
          return (
            <div className='gap-x-3 border rounded-md'>
              <div>
                {medicine.name}
              </div>
              <div>
                {medicine.strengthValues}
              </div>
              <div>
                {medicine.strengthUnit}
              </div>
              <div>
                {instructionList[index].description}
              </div>
            </div>
          );
        })
      }
    </div>
  );
}