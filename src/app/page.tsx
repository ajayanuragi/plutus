import Search from "./components/Search";

export default function Home() {
  return (
    <div className="font-sans min-w-screen min-h-screen flex flex-col justify-center items-center gap-2 bg-gray-200">
      <div className="max-w-1/2">
        <h1 className="text-9xl my-0 mx-auto mb-5">
          Watch any <span className="text-amber-700 font-extrabold">Movie</span> or <br></br><span className="text-amber-700 font-extrabold">Tv Show
          </span>
        </h1>
      </div>
      <Search />
    </div>
  );
}
