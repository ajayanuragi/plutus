"use client";

import { useRef, useState, useEffect } from "react";

interface SectionCarouselProps {
    children: React.ReactNode;
}

export default function SectionCarousel({ children }: SectionCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftBtn, setShowLeftBtn] = useState(false);
    const [showRightBtn, setShowRightBtn] = useState(true);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8;
            const target = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

            scrollRef.current.scrollTo({
                left: target,
                behavior: "smooth",
            });
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftBtn(scrollLeft > 10);
            setShowRightBtn(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.addEventListener("scroll", handleScroll);
            // Initial check
            handleScroll();
            return () => el.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <div className="relative group/carousel">
            {/* Left Button */}
            <button
                onClick={() => scroll("left")}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-orange-500 shadow-2xl transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 ${!showLeftBtn ? "pointer-events-none scale-0" : "scale-100"
                    } -ml-4 md:-ml-6 hover:bg-orange-600 hover:text-white`}
                aria-label="Scroll left"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            {/* Main Container */}
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory px-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
                {children}
            </div>

            {/* Right Button */}
            <button
                onClick={() => scroll("right")}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-orange-500 shadow-2xl transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 ${!showRightBtn ? "pointer-events-none scale-0" : "scale-100"
                    } -mr-4 md:-mr-6 hover:bg-orange-600 hover:text-white`}
                aria-label="Scroll right"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    );
}
