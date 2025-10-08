import Image from "next/image";
import Link from "next/link";

export default function SearchResults({ data }) {
  if (!data || !Array.isArray(data.results)) {
    return null;
  }
  console.log(data)
  return (
    <div className="absolute p-2 m-2 w-full">
      {data.results.slice(0, 5).map(result => (
        <Link href={`/about/${result.id}`} key={result.id} prefetch={true}>
          <div className="p-2 flex gap-2 shadow-xs rounded-xs bg-gray-100">
            <Image src={result.image} className="h-16 w-16" alt={result.title} width={1024} height={1024} quality={100} />
            <div className="flex flex-col">

              <p>{result.title}</p>
              <p className="border-amber-700 text-xs">{result.type}</p>
            </div>
          </div>
        </Link>
      ))}
      <Link href={'/browse'}>
        All Results...
      </Link>
    </div >
  )
}
