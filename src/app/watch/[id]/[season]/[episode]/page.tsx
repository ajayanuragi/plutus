import { MediaResult } from "@/types/MediaResultTypes";
import Image from "next/image";
import Link from "next/link";

const backendApi = process.env.NEXT_PUBLIC_BACKEND_API;
interface PageProps {
  params: {
    id: string,
    season: number,
    episode: number
  }
}
const api = process.env.NEXT_PUBLIC_STREAMING_API
export default async function WatchEpisode({ params }: PageProps) {
  const { id, season, episode } = await params;
  const response = await fetch(`${backendApi}/info/${id}?type=tv`)

  if (!response.ok) {
    return (
      <div>
        Error fetching the information about show
      </div>
    )
  }
  const result: MediaResult = await response.json()
  const selectedSeason = result.seasons?.find((s) => Number(s.season) === Number(season));
  console.log(selectedSeason)
  return (
    <div className="max-h-screen my-20">
      <div className="flex justify-evenly gap-2">
        <iframe
          src={`${api}/tv/${id}/${season}/${episode}?color=c2410c&autoPlay=true&episodeSelector=true`}
          width="100%"
          allowFullScreen
          className="w-full h-150 ml-20 relative my-10 rounded-xl"
        />
        <div className="flex flex-col gap-2 px-8 w-1/3">
          <h1 className="px-8">
            {result.title}
          </h1>
          {selectedSeason?.episodes.map(episode => (
            <Link key={episode.id} href={`/watch/${id}/${selectedSeason.season}/${episode.episode}`}>
              <div className="flex gap-2 flex-col">

                <Image src={episode?.img?.hd} alt={episode.title} height={100} width={100} className="h-36 w-full aspect-video rounded-xl" />
                <h1 className="mb-2">{episode.episode} - {episode.title}</h1>
              </div>
            </Link>
          ))}

        </div>
      </div>
      <Link href={`/about/tv/${id}/${season}`} className="absolute top-8 left-10">Back</Link>
    </div>
  );
}
