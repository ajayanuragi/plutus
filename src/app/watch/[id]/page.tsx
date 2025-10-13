import Link from "next/link";

interface PageProps {
  params: {
    id: string
  }
}
const api = process.env.NEXT_PUBLIC_STREAMING_API
export default async function WatchMovie({ params }: PageProps) {
  const { id } = await params;
  return (
    <div className="max-h-screen">
      <iframe
        src={`${api}/movie/${id}?color=c2410c&autoPlay=true`}
        width="50%"
        allowFullScreen
        className="h-screen w-screen relative"
      />
      <Link href={`/about/movie/${id}`} className="absolute top-8 left-10 text-white">Back</Link>
    </div>
  );
}
