export default function PatinetNameInput({
  patient,
  setPatient
}: {
  patient: string,
  setPatient: (patientName: string) => void,
}) {
  return (
    <div>
      <div className='w-2/12 text-gray-600'>Patient Name</div>
      <input
        type='text'
        value={patient}
        onChange={(e) => setPatient(e.target.value)}
        className='w-10/12 p-1 rounded-lg text-xl border border-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-sm'
        placeholder={patient}
      />
    </div>
  );
}