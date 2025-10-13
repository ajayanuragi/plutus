import { ResultProp } from "@/types/SearchTypes";
import Image from "next/image";
import Link from "next/link";

export default function SearchResultItem({ result }: { result: ResultProp }) {
  const type = result.type === "TV Series" ? "tv" :
    result.type === "Movie" ? "movie" :
      result.type;
  return (
    <Link href={`/about/${type}/${result.id}`}>
      <div className="mt-2 px-2">
        <Image src={result.image} className="h-96 w-full rounded-xl" alt={result.title} width={1024} height={1024} />
        <div className="py-2">
          <div> <p className="text-lg line-clamp-1">{result.title}</p></div>
          <div className="flex items-center justify-between gap-2 text-xs">
            <p className="border-amber-700">{result.type.toLocaleUpperCase()}</p>
            <p>{result.releaseDate}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
