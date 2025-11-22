import SearchBox from '@components/search-box';

export default function Home() {
  return (<div className='flex flex-col justify-center items-center gap-3'>
    <h1 className='text-5xl text-blue-950 font-semibold font-sans mt-40 mb-20'>Clinic System</h1>
    <SearchBox />
  </div>);
}