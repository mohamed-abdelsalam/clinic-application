import SearchBox from '@components/search-box';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col flex-1'>
      <header className='flex items-center justify-between p-4 bg-white shadow-md'>
        <SearchBox />
      </header>
      <main className='flex-1 overflow-y-auto p-4'>{children}</main>
    </div>
  );
}