export default function PatinetJobInput({
  job,
  setJob
}: {
  job: string,
  setJob: (job: string) => void,
}) {
  return (
    <input
      type='text'
      value={job}
      onChange={(e) => setJob(e.target.value)}
      className='p-1 rounded-lg text-xl border border-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-sm'
      placeholder={job}
    />
  );
}