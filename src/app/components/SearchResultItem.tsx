import { ResultProp } from "@/types/SearchTypes";
import Image from "next/image";
import Link from "next/link";

export default function SearchResultItem({ result }: { result: ResultProp }) {
  return (
    <Link href={`/about/${result.id}`} prefetch={true}>
      <div className="px-5 py-2 mt-2 flex gap-2 shadow-xs rounded-xs not-dark:bg-gray-100 dark: bg-gray-700 items-center">
        <Image src={result.image} className="h-16 w-16" alt={result.title} width={1024} height={1024} />
        <div className="flex flex-col">
          <div> <p>{result.title}</p></div>

          <div className="flex items-center gap-2 text-2xs">
            <p className="border-amber-700 text-xs">{result.type}</p>
            <p>{result.releaseDate}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
