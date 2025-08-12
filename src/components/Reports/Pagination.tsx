import React from 'react';

interface Props {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    totalCount: number;
    currentCount: number;
}

const Pagination: React.FC<Props> = ({
    currentPage,
    totalPages,
    setCurrentPage,
    totalCount,
    currentCount,
}) => {
    return (
        <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
            <span>
                Showing {currentCount ? (currentPage - 1) * currentCount + 1 : 0}–{(currentPage - 1) * currentCount + currentCount} of {totalCount} records
            </span>
            <div className="space-x-2">
                <button
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                    Previous
                </button>
                ...
                <button
                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                    Next
                </button>

            </div>
        </div>
    );
};

export default Pagination;
