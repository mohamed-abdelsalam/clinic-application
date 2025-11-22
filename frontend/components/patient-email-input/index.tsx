export default function PatinetEmailInput({
  email,
  setEmail
}: {
  email: string,
  setEmail: (email: string) => void,
}) {
  return (
    <input
      type='text'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className='p-1 rounded-lg text-xl border border-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-sm'
      placeholder={email}
    />
  );
}