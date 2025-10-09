import { ResultProp } from "@/types/SearchTypes";
import Image from "next/image";
import Link from "next/link";

export default function MediaCard({ result }: { result: ResultProp }) {
  return (
    <Link href={`/about/${result.id}`}>
      <div className="hover:scale-105">
        <Image src={result.image} alt={result.title} height={350} width={200} className="w-full h-96 rounded-xl" />
        <div className="flex flex-col">
          <h1 className="truncate my-1">{result.title}</h1>
          <div className="flex flex-row items-center justify-between text-xs text-black/70 dark:text-white/50">
            <p className="border-orange-700 border-1 rounded px-2 py-1">
              {result?.releaseDate}
            </p>
            <div className="flex gap-2 items-center">
              <p className="border-orange-700 border-1 rounded px-2 py-1">{result?.rating}</p>
              <p className="border-orange-700 border-1 rounded px-2 py-1">{result?.type}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
