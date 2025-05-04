import React, { useEffect, useState } from "react";
import "./Pagination.css";

interface PaginationProps {
  totalItem: number;
  perPage: number;
  setPageNumber: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItem,
  perPage,
  setPageNumber,
}) => {
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (totalItem > 0 && perPage > 0) {
      const pages = Math.ceil(totalItem / perPage);
      setTotalPages(pages);
    }
  }, [totalItem, perPage]);

  return (
    <div className="Pagination-container">
      <p className="actions">Previous</p>
      <div className="btn-container">
        {Array.from({ length: totalPages }, (_, index) => (
          <span onClick={() => setPageNumber(index)} key={index}>
            {index + 1}
          </span>
        ))}
      </div>
      <p className="actions">Next</p>
    </div>
  );
};

export default Pagination;
