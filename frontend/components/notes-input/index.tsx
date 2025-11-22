export default function NotesInput({
  notes,
  setNotes
}: {
  notes: string[],
  setNotes: (notes: string[]) => void,
}) {
  return (
    <textarea 
      value={notes}
      onChange={(e) => setNotes(e.target.value.split(','))}
      className='w-full rounded-lg border border-gray-900 text-l px-2 focus:ring-blue-500 focus:border-blue-500'
      rows={3}
      placeholder='General Notes'
    />
  )
};