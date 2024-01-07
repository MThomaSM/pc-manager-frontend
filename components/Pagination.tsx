import React, { useState, useEffect } from 'react';

interface PaginationProps {
    total: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, itemsPerPage, currentPage, onPageChange }) => {
    const [pages, setPages] = useState<(number | string)[]>([]);
    const totalPages = Math.ceil(total / itemsPerPage);

    useEffect(() => {
        let startPage: number = Math.max(1, currentPage - 3);
        let endPage: number = Math.min(totalPages, currentPage + 3);
        const pagesArray: (number | string)[] = [];

        if (startPage > 1) {
            pagesArray.push('<<', '<', '...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pagesArray.push(i);
        }

        if (endPage < totalPages) {
            pagesArray.push('...', '>', '>>');
        }

        setPages(pagesArray);
    }, [total, itemsPerPage, currentPage]);

    return (
        <div className="flex justify-center items-center gap-x-1.5">
            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => {
                        if (typeof page === 'number') {
                            onPageChange(page);
                        } else if (page === '<<') {
                            onPageChange(1);
                        } else if (page === '>>') {
                            onPageChange(totalPages);
                        } else if (page === '<') {
                            onPageChange(Math.max(1, currentPage - 1));
                        } else if (page === '>') {
                            onPageChange(Math.min(totalPages, currentPage + 1));
                        }
                    }}
                    className={`page-item ${currentPage === page ? 'bg-blue-500 scale-125' : ''} bg-blue-400 font-medium rounded-lg px-2.5 py-1.5 text-white hover:bg-blue-600 hover:cursor-pointer transition-all hover:scale-110`}
                    disabled={typeof page !== 'number' && page !== '<<' && page !== '>>' && page !== '<' && page !== '>'}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
