export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  pageSize,
  setPageSize,
  totalProducts,
}) {

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalProducts);
  return (
    <div>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <p>Total pages: {totalPages}</p>
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}

      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>

      <select
        value={pageSize}
        onChange={(event) => {
          setPageSize(Number(event.target.value));
          setCurrentPage(1);
        }}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>

      <p>
        Showing {start}–{end} of {totalProducts}
      </p>
    </div>
  );
}