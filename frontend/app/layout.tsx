import { Metadata } from 'next';
import SideBar from '@components/side-bar';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Clinic Management System',
  description: 'Clinic Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className='flex h-screen bg-gray-50'>
        <SideBar />
        <main className='flex-1'>{children}</main>
        <Toaster position='top-right' />
      </body>
    </html>
  )
}