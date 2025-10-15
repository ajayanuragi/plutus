"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { DataProp } from "@/types/SearchTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearcPagination from "../components/search/SearchPagination";
import Link from "next/link";
export default function Search() {
  const [query, setQuery] = useState<string>('')
  const debouncedQuery = useDebounce(query, 500)
  const [page, setPage] = useState<number>(1);
  const [searchResults, setSearchResults] = useState<DataProp | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {

    const fetchResults = async () => {
      if (!debouncedQuery) {
        setSearchResults(null);
        return;
      }
      const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_API}/${debouncedQuery}`;
      try {
        setLoading(true)
        const response = await fetch(`${fetchUrl}?page=${page}`)
        const results = await response.json()
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults(null);
      } finally {
        setLoading(false)
      }

    }
    fetchResults();
  }, [debouncedQuery, page])

  const totalPages = searchResults?.totalPages || 1
  return (
    <div className="my-20">
      <div className="max-w-xl mx-auto flex items-center justify-center flex-col gap-4">
        <h1 className="text-4xl text-center">Discover your favorite movie and tv show</h1>
        <p>whatever you want to watch just type here</p>
        <input placeholder="enter movie or show.." className="shadow p-2"
          value={query}
          type='text'
          onChange={({ target }) => setQuery(target.value)}
        />
      </div>

      <div className="my-10 px-8">
        {searchResults && Array.isArray(searchResults.results) ? (
          <>
            {
              searchResults.totalResults && (
                <div className="flex items-center justify-between my-4">
                  <h1> Total results </h1>
                  <p>{searchResults.totalResults}</p>
                </div>
              )
            }
            <div className="grid grid-cols-5 gap-4">
              {searchResults.results.map((item) => (
                <Link key={item.id} href={`/about/${item.type === 'TV Series' ? 'tv' : 'movie'}/${item.id}`}>
                  <div >
                    <Image src={item?.image} height={500} width={350} alt={item?.title} className="w-full h-96" />
                    <h2 className="text-lg font-semibold line-clamp-1">{item?.title}</h2>
                    <div className="flex items-center justify-between">
                      <p>
                        {item?.type}
                      </p>
                      <p>
                        {item?.releaseDate}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          loading ? <h1> Loading ... </h1> : (
            debouncedQuery &&
            <h1> NO results found </h1>
          )
        )
        }
      </div>
      {
        searchResults &&
        <SearcPagination totalPages={totalPages} currentPage={page} setPage={setPage} />
      }
    </div>
  )
}
