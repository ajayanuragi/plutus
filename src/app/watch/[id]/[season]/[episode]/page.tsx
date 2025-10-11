import Link from "next/link";

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
  return (
    <div className="max-h-screen">
      <iframe
        src={`${api}/tv/${id}/${season}/${episode}?color=c2410c&autoPlay=true&episodeSelector=true`}
        width="100%"
        allowFullScreen
        className="h-screen w-screen relative"
      />
      <Link href={`/about/tv/${id}/${season}`} className="absolute top-8 left-10 text-white">Back</Link>
    </div>
  );
}
