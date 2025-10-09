"use client";
import { useAtom } from "jotai";
import { latestResultAtom, latestSearchAtom } from "@/atoms/search";
import MediaCard from "../components/browse/MediaCard";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
const api = process.env.NEXT_PUBLIC_BACKEND_API

export default function BrowseClient() {
  const [data, setData] = useAtom(latestResultAtom);
  const [keyword, setKeyword] = useAtom(latestSearchAtom);
  const totalPages: number = data?.totalPages || 1
  const [page, setPage] = useState<number>(1);
  const debouncedValue = useDebounce(keyword, 500)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!debouncedValue) return;
    setLoading(true);
    setError(null);
    fetch(`${api}` + `/${debouncedValue}?page=${page}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json()
      })
      .then((data) => {
        setData(data)
        setKeyword(debouncedValue)
      })
      .catch((err) => {
        console.error(err)
        setError("Something went wrong. Please try again.")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page, debouncedValue, setData, setKeyword])

  return (
    <div className="px-16 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl mb-4">Browse All</h1>
        <p className="text-orange-700">{data?.totalResults} results</p>
      </div>
      {error && (
        <p>{error}</p>
      )}
      {loading && (<p>
        Loading...
      </p>)}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 col-auto gap-4 mt-2">
        {data?.results?.map(result => (
          <MediaCard result={result} key={result.id} />
        ))}
      </div>
      <Pagination totalPages={totalPages} setPage={setPage} currentPage={page} />
    </div>
  )
}
