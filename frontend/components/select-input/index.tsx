export default function SelectInput<T>({
  options,
  selected,
  setSelected,
}: {
  options: T[],
  selected: T,
  setSelected: (value: T) => void,
}) {

  return (
    <div className='flex flex-row gap-4'>
      {options.map((option: T) => (
        <label
          key={option as string}
          className={`block cursor-pointer ${selected === option ? 'border-blue-500 bg-blue-50': 'bg-gray-50'}`}
        >
          <input
            type='radio'
            value={option as string}
            checked={selected === option}
            onChange={(e) => setSelected((e.target.value) as T)}
            className='mr-2'
          />
          {option as string}
        </label>
      ))}
    </div>
  );
};
