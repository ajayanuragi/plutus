"use client"
import Link from "next/link";
import { useEffect, useState } from "react"
import SearchResults from "./SearchResults";
const api = process.env.NEXT_PUBLIC_BACKEND_API

export default function Search() {
  const [search, setSearch] = useState<string>('')
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${api}` + `/${search}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [search])
  return (
    <div className="w-1/2">
      <div className="flex gap-2 justify-center">
        <input type="text" placeholder="search for movie or tv show..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-2 border-amber-700 p-2 w-3/4">
        </input>
        <Link className="bg-amber-700 p-2 text-white" href={'/home'}>
          watch now
        </Link>
      </div>

      <div className="relative">
        {isLoading ? "" : <SearchResults data={data} />}
      </div>

    </div>
  )
}
