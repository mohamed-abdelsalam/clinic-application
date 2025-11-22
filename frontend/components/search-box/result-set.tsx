import Link from 'next/link';

export type SearchResultType = 'patient' | 'prescription' | 'medicine' | 'ALL';

interface ResultSet {
  resultType: SearchResultType;
  results: any[];
  query: string;
}

export default function ResultSet({resultType, results, query}: ResultSet) {
  if (results.length === 0) return null;

  return (
    <div>
      <Link href={`/search?query=${query}&filters=${resultType}`}>
        <div className='px-3 py-2 text-xs font-semibold text-gray-500'>
          {resultType} ({results.length})
        </div>
      </Link>
      {results.map((entry) => (
        <Link href={`/${resultType}/${entry.id}`} key={`link-${entry.id}`}>
          <div key={entry.id} className='px-3 py-2 hover:bg-gray-100 cursor-pointer'>
            {entry.name}
          </div>
        </Link>
      ))}
    </div>
  );
}