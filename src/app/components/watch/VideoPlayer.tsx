"use client";

import { useState } from "react";

interface VideoPlayerProps {
    id: string;
    type: "movie" | "tv";
    season?: number;
    episode?: number;
}

const SERVERS = [
    { name: "Videas (Fast)", id: "videasy" },
    { name: "VidSrc (Stable)", id: "vidsrc" },
    { name: "2Embed (HQ)", id: "2embed" },
    { name: "Super (Fast)", id: "super" },
];

export default function VideoPlayer({ id, type, season, episode }: VideoPlayerProps) {
    const [activeServer, setActiveServer] = useState(SERVERS[0].id);

    const getSource = (server: string) => {
        switch (server) {
            case "videasy":
                return type === "movie"
                    ? `https://player.videasy.net/movie/${id}?color=c2410c&autoPlay=true`
                    : `https://player.videasy.net/tv/${id}/${season}/${episode}?color=c2410c&autoPlay=true`;
            case "vidsrc":
                return type === "movie"
                    ? `https://vidsrc.me/embed/movie?tmdb=${id}`
                    : `https://vidsrc.me/embed/tv?tmdb=${id}&sea=${season}&epi=${episode}`;
            case "2embed":
                return type === "movie"
                    ? `https://www.2embed.cc/embed/${id}`
                    : `https://www.2embed.cc/embed/tv?tmdb=${id}&s=${season}&e=${episode}`;
            case "super":
                return type === "movie"
                    ? `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`
                    : `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;
            default:
                return "";
        }
    };

    return (
        <div className="space-y-6">
            {/* Player Container */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5 bg-black group">
                <iframe
                    src={getSource(activeServer)}
                    width="100%"
                    height="100%"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                />
                {/* Subtle Ambient Glow */}
                <div className="absolute -inset-1 bg-orange-600 opacity-5 blur-2xl pointer-events-none" />
            </div>

            {/* Server Switcher */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">Servers:</span>
                    {SERVERS.map((server) => (
                        <button
                            key={server.id}
                            onClick={() => setActiveServer(server.id)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${activeServer === server.id
                                ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20 scale-105"
                                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
                                }`}
                        >
                            {server.name}
                        </button>
                    ))}
                </div>

                {/* Ad-Blocker Tip */}
                <div className="flex items-center gap-3 px-4 py-2 bg-orange-600/10 border border-orange-500/20 rounded-xl max-w-sm">
                    <span className="text-xl">🛡️</span>
                    <p className="text-[10px] md:text-xs text-gray-300 leading-tight">
                        <span className="text-orange-500 font-bold uppercase block mb-1">PRO TIP</span>
                        Use <span className="text-white font-bold">Brave Browser</span> or <span className="text-white font-bold">uBlock Origin</span> for a 100% ad-free experience.
                    </p>
                </div>
            </div>
        </div>
    );
}
