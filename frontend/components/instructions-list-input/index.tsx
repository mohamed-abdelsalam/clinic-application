import { InstructionDto } from '@clinic-application/shared';
import InstructionEntry from './instruction-entry';

interface InstructionsListInputProps {
  group: number,
  instructions: InstructionDto[],
  setInstructions: (instructions: InstructionDto[]) => void,
}

export default function InstructionsListInput({
  group,
  instructions,
  setInstructions,
}: InstructionsListInputProps ) {

  const AddInstructionButton = (
    <button
      type='button'
      onClick={() => {
        setInstructions([
          ...instructions,
          {
          medicineId: 0,
          description: '',
          prescriptionId: 0,
          id: 0,
          strengthValue: '',
          group,
        }
        ]);
      }}
      className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600'
    >
      +
    </button>
  );

  return (
    <div className='space-y-4' key={`inst-list-${group}`}>
      <div className='overflow-auto'>
        <div
          key={'instruction-list'}
          className='grid grid-cols-1 md:grid-cols-3 gap-4 items-start border p4 rounded-lg bg-gray-50 relative'
        >
          <label className='block text-center text-sm text-gray-600 py-2'>Medicine</label>
          <label className='block text-sm text-center text-gray-600 py-2'>Strength Value</label>
          <label className='block text-sm text-center text-gray-600 py-2'>Notes</label>
        </div>
        {instructions.map((instruction, index) => (
          <InstructionEntry
            index={index}
            onChange={(index, field, value) => {
              const updated = [...instructions];
              switch (field) {
                case 'description':
                  updated[index] = {...updated[index], description: String(value)};
                  break;
                case 'medicineId':
                  updated[index] = {...updated[index], medicineId: +value};
                  break;
                case 'strengthValue':
                  updated[index] = {...updated[index], strengthValue: String(value)};
                  break;
              }
              setInstructions(updated);
            }}
            onRemove={(index) => {
              setInstructions(instructions.filter((_, i) => i !== index) );
            }}
          />)
        )}
      </div>
      {AddInstructionButton}
    </div>
  );
}