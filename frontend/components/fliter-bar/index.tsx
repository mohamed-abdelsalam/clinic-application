import { Filter } from '@clinic-application/shared';

export default function FilterBar({
  title,
  options,
  selected,
  setSelected,
}: {
  title: string,
  options: Filter[],
  selected: Filter[],
  setSelected: (value: Filter[]) => void,
}) {

  const handleChange = (e) => {
    if (selected.includes(e.target.value)) {
      setSelected(selected.filter((option) => option !== e.target.value));
    } else {
      setSelected([...selected, e.target.value]);
    }
  }

  return (
    <div className='flex flex-col gap-3 space-y-2'>
      <div className='text-xl text-gray-600'>{title}</div>
      {options.map((option: Filter) => (
        <label
          className='ml-2'
          key={option}
        >
          <input
            type='checkbox'
            name={`filter${title}`}
            value={option}
            checked={selected.includes(option)}
            onChange={handleChange}
            className='mr-2'
          />
          {option}
        </label>
      ))}
    </div>
  );
};
