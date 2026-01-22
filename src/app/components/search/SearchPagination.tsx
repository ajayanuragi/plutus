import { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}
export default function SearcPagination({ totalPages, currentPage, setPage }: PaginationProps) {
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

  const disabledClass = "opacity-50 pointer-events-none cursor-not-allowed";

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button onClick={() => setPage(1)}
        className={`px-2 ${currentPage === 1 ? disabledClass : "hover:underline"}`}
        aria-disabled={currentPage === 1}>
        ⏮
      </button>

      <button
        onClick={() => setPage(currentPage - 1)}
        className="cursor-pointer"
        aria-disabled={currentPage === 1}>
        ◀
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => setPage(page)}
          className={`px-3 py-1 rounded ${page === currentPage ? "bg-orange-700 text-white" : "text-orange-700 bg-white"}`}
        >
          {page}
        </button>
      ))}
      <button onClick={() => setPage(currentPage + 1)} className="cursor-pointer"
        aria-disabled={currentPage === totalPages}>
        ▶
      </button>
      <button onClick={() => setPage(totalPages)} className="cursor-pointer"
        aria-disabled={currentPage === totalPages}>
        ⏭
      </button>
    </div>
  )
}
