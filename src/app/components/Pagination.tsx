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

  const createPageLink = (page: number) => `?type=${type}&page=${page}`

  const disabledClass = "opacity-50 pointer-events-none cursor-not-allowed";

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <Link href={currentPage === 1 ? "#" : createPageLink(1)}
        className={`px-2 ${currentPage === 1 ? disabledClass : "hover:underline"}`}
        aria-disabled={currentPage === 1}>
        ⏮
      </Link>
      <Link href={createPageLink(Math.max(1, currentPage - 1))} className="cursor-pointer"
        aria-disabled={currentPage === 1}>
        ◀
      </Link>
      {getPageNumbers().map((page) => (
        <Link
          key={page}
          href={createPageLink(page)}
          className={`px-3 py-1 rounded ${page === currentPage ? "bg-orange-700 text-white" : "text-orange-700 bg-white"}`}
        >
          {page}
        </Link>
      ))}
      <Link href={createPageLink(Math.min(totalPages, currentPage + 1))} className="cursor-pointer"
        aria-disabled={currentPage === totalPages}>
        ▶
      </Link>
      <Link href={createPageLink(totalPages)} className="cursor-pointer"
        aria-disabled={currentPage === totalPages}>
        ⏭
      </Link>
    </div>
  )
}
