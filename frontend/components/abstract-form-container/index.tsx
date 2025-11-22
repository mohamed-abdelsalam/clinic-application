
export default function AbstractFormContainer({
  title,
  handleSubmit,
  children,
}: {
  title: string,
  handleSubmit: (e: React.FormEvent) => void,
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col w-auto mx-auto p-6 bg-white'>
      <h1 className='text-2xl font-semibold mb-4 text-gray-800'>{title}</h1>
      <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start border p4 rounded-lg bg-gray-50 relative'>
        {children}
      </form>
    </div>
  )
}