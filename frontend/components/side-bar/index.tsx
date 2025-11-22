import Link from 'next/link';

export default function SideBar() {
  return (
    <aside className='w-64 bg-white shadow-md p-6 space-y-6 h-auto'>
      <Link href='/'><h2 className='text-xl font-semibold text-gray-800'>Osama Clinic System</h2></Link>
      <nav className='flex flex-col space-y-2'>
        <Link href='/prescription/new' className='px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition'>New Prescription</Link>
        <Link href='/medicines/new' className='px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition'>New Medicine</Link>
        <Link href='/patient/new' className='px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition'>New Patient</Link>
        <Link href='/visit/new' className='px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition'>New Visit</Link>
      </nav>
    </aside>
  );
};
