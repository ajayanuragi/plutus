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

  const btnBase = "w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 font-bold border";
  const activeBtn = "bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-600/30 scale-110";
  const inactiveBtn = "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20";
  const disabledBtn = "opacity-30 pointer-events-none grayscale";

  return (
    <div className="flex items-center justify-center gap-3 py-8">
      {/* First / Prev Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPage(1)}
          disabled={currentPage === 1}
          className={`${btnBase} ${currentPage === 1 ? disabledBtn : inactiveBtn}`}
          title="First Page"
        >
          ⏮
        </button>
        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${btnBase} ${currentPage === 1 ? disabledBtn : inactiveBtn}`}
          title="Previous Page"
        >
          ◀
        </button>
      </div>

      {/* Numerical Pages */}
      <div className="flex items-center gap-2 px-4 border-x border-white/10">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={`${btnBase} ${page === currentPage ? activeBtn : inactiveBtn}`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next / Last Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${btnBase} ${currentPage === totalPages ? disabledBtn : inactiveBtn}`}
          title="Next Page"
        >
          ▶
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={currentPage === totalPages}
          className={`${btnBase} ${currentPage === totalPages ? disabledBtn : inactiveBtn}`}
          title="Last Page"
        >
          ⏭
        </button>
      </div>
    </div>
  );
}
