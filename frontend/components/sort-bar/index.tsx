import { SortOption } from '@clinic-application/shared';

export default function SortBar({
  title,
  options,
  selected,
  setSelected,
}: {
  title: string,
  options: SortOption[],
  selected: SortOption,
  setSelected: (value: SortOption) => void,
}) {

  return (
    <div className='flex flex-col gap-3 space-y-2'>
      <div className='text-xl text-gray-600'>{title}</div>
      {options.map((option: SortOption) => (
        <label
          key={option}
        >
          <input
            type='radio'
            name={`sort${title}`}
            value={option}
            checked={option === selected}
            onChange={e => setSelected(e.target.value as SortOption)}
            className='mr-2'
          />
          {option}
        </label>
      ))}
    </div>
  );
};
