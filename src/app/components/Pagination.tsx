import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  type: string
}
export default function Pagination({ totalPages, currentPage, type }: PaginationProps) {
  const visiblePages = 5;

  const getPageNumbers = () => {
    const pages = [];

    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = startPage + visiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const createPageLink = (page: number) => `?type=${type}&page=${page}`;

  const buttonBase = "flex items-center justify-center transition-all duration-300 rounded-xl border font-bold text-sm bg-white/5 backdrop-blur-md";
  const activeClass = "bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-600/30 scale-110 z-10";
  const inactiveClass = "border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20";
  const navBtnClass = "w-10 h-10 border-white/10 text-orange-500 hover:bg-orange-600 hover:text-white hover:border-orange-500";
  const disabledClass = "opacity-20 cursor-not-allowed grayscale pointer-events-none";

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {/* First Page */}
      <Link
        href={currentPage === 1 ? "#" : createPageLink(1)}
        className={`${buttonBase} ${navBtnClass} ${currentPage === 1 ? disabledClass : ""}`}
        aria-label="First page"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </Link>

      {/* Previous Page */}
      <Link
        href={createPageLink(Math.max(1, currentPage - 1))}
        className={`${buttonBase} ${navBtnClass} ${currentPage === 1 ? disabledClass : ""}`}
        aria-label="Previous page"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      {/* Page Numbers */}
      <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md p-1 rounded-2xl border border-white/10">
        {getPageNumbers().map((page) => (
          <Link
            key={page}
            href={createPageLink(page)}
            className={`${buttonBase} w-10 h-10 ${page === currentPage ? activeClass : "bg-transparent border-transparent text-gray-400 hover:text-white"}`}
          >
            {page}
          </Link>
        ))}
      </div>

      {/* Next Page */}
      <Link
        href={createPageLink(Math.min(totalPages, currentPage + 1))}
        className={`${buttonBase} ${navBtnClass} ${currentPage === totalPages ? disabledClass : ""}`}
        aria-label="Next page"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
        </svg>
      </Link>

      {/* Last Page */}
      <Link
        href={createPageLink(totalPages)}
        className={`${buttonBase} ${navBtnClass} ${currentPage === totalPages ? disabledClass : ""}`}
        aria-label="Last page"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
