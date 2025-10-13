import Link from "next/link"
import SearchIcon from "../icons/SearchIcon"

export default function Navbar() {
  return (
    <header className="relative">
      <div className="flex max-w-xl items-center justify-between mx-auto my-2 fixed top-2 right-0 z-30 left-0 rounded-xl px-4 py-2  bg-white/60">
        <Link href={"/"} className="text-orange-700 font-semibold tracking-wider text-3xl">
          <h1>Plutus</h1>
        </Link>
        <Link href={'/search'}> 
          <SearchIcon />
        </Link>
        <h1 className="text-black"> Profile</h1>
      </div>
    </header>

  )
}
