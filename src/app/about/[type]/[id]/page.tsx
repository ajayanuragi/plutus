import { MediaResult } from "@/types/MediaResultTypes";
import Image from "next/image";

interface PageProps {
  params: { type: string; id: string };
}
export default async function AboutPage({ params }: PageProps) {
  const { id, type } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/info/${id}?type=${type}`, {
    next: { revalidate: 18000 },
  });

  if (!res.ok) {
    return (
      <div className="text-red-500 p-4">
        ❌ Failed to fetch details for <b>{type}</b> with ID <b>{id}</b>
      </div>
    );
  }

  const data: MediaResult = await res.json();
  return (
    <div>
      <div className="min-h-screen">
        {data.logos?.[0]?.url && (
          <Image src={data.cover} alt={data.title} width={1000} height={1000} className="w-full h-screen relative brightness-70" />
        )}
        <div className="md:px-16 bottom-0 text-white tracking-wide absolute left-0 right-0 bg-gradient-to-t from-black to-transparent py-20">
          <Image src={data.logos[0].url} alt={data.title} width={data.logos[0].width} height={1000} className="h-auto w-md" />
          <div className="flex gap-4 my-4 items-center">
            <p>🗓️ {data.releaseDate}</p>
            <p> ⭐ {data.rating}</p>
          </div>
          <div className="flex gap-2 my-4 items-center">
            {data.genres.slice(0, 3).map((genre, index) => (
              <p className="border-1 p-2 rounded-xl text-xs" key={index}>{genre}</p>
            ))}
          </div>
          <p className="font-sans line-clamp-3 text-lg max-w-2xl text-ellipsis">{data.description}</p>
          <button className="bg-amber-700 text-white cursor-pointer px-4 py-2 my-4">Watch Now</button>
        </div>
      </div>
      <div className="text-6xl my-10">episodes</div>
    </div>
  );
}
