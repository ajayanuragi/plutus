"use client"
import Link from "next/link";
import { useEffect, useState } from "react"
import SearchResults from "./SearchResults";
import { DataProp } from "@/types/SearchTypes";
import { useSetAtom } from "jotai";
import { latestResultAtom, latestSearchAtom } from "@/atoms/search";
import { useDebounce } from "@/hooks/useDebounce";
const api = process.env.NEXT_PUBLIC_BACKEND_API

export default function Search() {
  const [search, setSearch] = useState<string>('')
  const [data, setData] = useState<DataProp | null>(null)
  const [isLoading, setLoading] = useState(true)

  const setLatestResult = useSetAtom(latestResultAtom);
  const setLatestSearch = useSetAtom(latestSearchAtom)
  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    if (!debouncedSearch) {
      setData(null)
      setLoading(false)
      return;
    }
    setLoading(true)
    fetch(`${api}` + `/${debouncedSearch}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLatestSearch(debouncedSearch)
        setLatestResult(data);
        setLoading(false)
      })
      .catch(() => setLoading(false));
  }, [debouncedSearch, setLatestResult, setLatestSearch])
  return (
    <div className="w-1/2">
      <div className="flex gap-2 justify-around">
        <input type="text" placeholder="search for movie or tv show..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-2 border-amber-700 p-2 w-3/4">
        </input>
        <Link className="bg-amber-700 p-2 text-white" href={'/home'}>
          watch now
        </Link>
      </div>
      <div>
        {!isLoading && data && <SearchResults data={data} />}
      </div>
    </div>
  )
}
