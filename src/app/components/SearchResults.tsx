import Link from "next/link";
import SearchResultItem from "./SearchResultItem";
import { DataProp } from "@/types/SearchTypes";
export default function SearchResults({ data }: { data: DataProp }) {
  return (
    <div className="mt-2">
      <div className="grid grid-cols-5 gap-4">
        {data.results.map(result => (
          <SearchResultItem result={result} key={result.id} />
        ))}
        {data.results &&
          <Link href={'/browse'} className="px-2 py-4 text-amber-800 text-center">
            All Results...
          </Link>
        }
      </div>
    </div >
  )
}
