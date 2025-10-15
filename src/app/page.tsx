import { DataProp } from "@/types/SearchTypes";
import Image from "next/image";
import Link from "next/link";

const api = process.env.NEXT_PUBLIC_BACKEND_API
export default async function Home() {
  const response = await fetch(`${api}/trending`)
  if (!response.ok) {
    return (
      <div className="text-red-500 p-4">
        ❌ Failed to fetch trending shows and Movies
      </div>
    );
  }
  const result: DataProp = await response.json();
  return (
    <div className="my-25 px-8">
      <div>
        <h1 className="my-5 text-3xl">Trending tv shows</h1>
        <div className="grid grid-cols-5 gap-2 w-full">
          {result.results.map(result => (
            result.type === 'TV Series' && (
              <Link href={`/about/tv/${result.id}`} key={result.id} className="last:mb-5">
                <div className="flex flex-col">
                  <Image src={result.image} width={300} height={350} alt={result.title} className="w-full h-96 rounded-xl" />
                  <div>
                    <h1 className="line-clamp-1 text-lg mt-2 mb-1">
                      {result.title}
                    </h1>
                    <div className="flex items-center justify-between text-xs">
                      <p className="border-2 px-2 py-1 rounded border-orange-500">{result.rating?.toPrecision(2)}</p>
                      <p className="border-2 px-2 py-1 rounded border-orange-500">{result.releaseDate}</p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          ))}
        </div>
        <Link href={'/trending/tv'} className="cursor-pointer border-2 border-orange-500 px-4 py-2" >
          view all
        </Link>
      </div>
      <div>
        <h1 className="my-5 text-3xl">Trending movies</h1>
        <div className="grid grid-cols-5 gap-2 w-full">
          {result.results.map(result => (
            result.type === 'Movie' && (
              <Link href={`/about/movie/${result.id}`} key={result.id} className="last:mb-5">
                <div className="flex flex-col">
                  <Image src={result.image} width={300} height={350} alt={result.title} className="w-full h-96 rounded-xl" />
                  <h1 className="line-clamp-1">
                    {result.title}
                  </h1>
                </div>
              </Link>
            )
          ))}
        </div>
        <Link href={'/trending/movie'} className="cursor-pointer border-2 border-orange-500 px-4 py-2" >
          view all
        </Link>
      </div>
    </div>
  )
}
