import Search from "./components/Search";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center gap-5 ">
      <div className="max-w-4xl">
        <h1 className="text-3xl md:text-9xl">
          Watch any <span className="text-amber-700 font-extrabold">Movie</span> or <br></br><span className="text-amber-700 font-extrabold">Tv Show
          </span>
        </h1>
      </div>
      <Search />
    </div>
  );
}
