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
        {/*<div className="">
          {selectedSeason?.episodes.map(episode => (
            <Link key={episode.episode} href={`/watch/${id}/${selectedSeason.season}/${episode.episode}`}>
              <div className="grid grid-cols-6 gap-2">
                <p className="px-1 py-1 border">
                  {episode.episode}
                </p>
                
              </div>
          
            </Link>
          ))}

        </div>*/}
      </div>
      <Link href={`/about/tv/${id}/${season}`} className="absolute top-8 left-10">Back</Link>
    </div>
  );
}
