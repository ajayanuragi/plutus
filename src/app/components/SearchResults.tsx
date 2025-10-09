import Link from "next/link";
import SearchResultItem from "./SearchResultItem";
import { DataProp } from "@/types/SearchTypes";


export default function SearchResults({ data }: { data: DataProp }) {
  if (!data || !Array.isArray(data.results)) {
    return null;
  }

  return (
    <div className=" mt-2 mb-2 w-full flex flex-col justify-around">
      <div className="flex flex-col">
        {data.results.slice(0, 5).map(result => (
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
