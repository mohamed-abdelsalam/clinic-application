'use client';

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationBar({ currentPage, totalPages } : PaginationBarProps) {

  return (
    <div className='mt-6 flex items-center gap-3'>
      <button
        onClick={() => {}}
        disabled={currentPage === 1}
        className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
      >
        Previous
      </button>
      <span className='text-sm'>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => {}}
        disabled={currentPage === totalPages}
        className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
      >
        Next
      </button>
    </div>
  )
}