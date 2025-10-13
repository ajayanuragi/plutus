import Pagination from "@/app/components/Pagination";
import { DataProp } from "@/types/SearchTypes";
import Image from "next/image";
import Link from "next/link";
const api = process.env.NEXT_PUBLIC_BACKEND_API
type TrendingPageProps = {
  params: { type: string };
  searchParams: { page?: string };
};

export default async function TrendingPage({ params, searchParams }: TrendingPageProps) {
  const currentPage = await Number(searchParams.page) || 1;
  const { type } = await params

  console.log(type)

  const response = await fetch(`${api}/trending?type=${type === 'tv' ? "TV Series" : "Movie"}&page=${currentPage}`)

  if (!response.ok) {
    return (
      <div className="text-red-500 p-4">
        ❌ Failed to fetch trending shows and Movies
      </div>
    );
  }
  const result: DataProp = await response.json();

  return (
    <div className="my-20 px-8">
      <div className="grid grid-cols-5 gap-2 w-full">
        {result.results.map(result => (
          result.type === 'TV Series' ? (
            <Link href={`/about/tv/${result.id}`} key={result.id}>
              <div className="flex flex-col">
                <Image src={result.image} width={300} height={350} alt={result.title} className="w-full h-96 rounded-xl" />
                <h1 className="line-clamp-1">
                  {result.title}
                </h1>
              </div>
            </Link>
          ) : (
            <Link href={`/about/movie/${result.id}`} key={result.id}>
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
      <Pagination totalPages={result.totalPages} currentPage={currentPage} type={type} />
    </div>
  )
}
