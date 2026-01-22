"use client"
import Link from "next/link"
import SearchIcon from "../icons/SearchIcon"

export default function Navbar() {

  return (
    <header className="relative">
      <div className="flex max-w-4xl items-center justify-between mx-auto my-4 fixed top-0 right-0 z-50 left-0 rounded-2xl px-6 py-3 bg-gray-900/80 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-4">
          <Link href={"/"} className="flex items-center gap-2 group">
            <h1 className="text-orange-600 font-bold tracking-tight text-2xl group-hover:text-orange-500 transition-colors drop-shadow-[0_0_8px_rgba(234,88,12,0.3)]">Plutus</h1>
          </Link>

        </div>

        <div className="flex items-center gap-6">
          <Link href={'/search'} className="text-gray-300 hover:text-orange-500 transition-colors">
            <SearchIcon />
          </Link>
          <div className="h-4 w-[1px] bg-white/10" />
          <h1 className="text-white font-medium hover:text-orange-500 cursor-pointer transition-colors">Profile</h1>
        </div>
      </div>
    </header>
  )
}
