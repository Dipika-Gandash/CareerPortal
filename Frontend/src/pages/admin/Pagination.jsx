import React from 'react'

const Pagination = ({currentPage, setCurrentPage, totalPages}) => {
  const handlePageChange = (page) => {
    if(page < 1 || page > totalPages) return ;
    setCurrentPage(page);
  }
  return (
    <div className='flex gap-2 justify-center mt-6'>
      <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage-1)} className="px-3 py-1 border rounded hover:bg-purple-500 hover:text-white disabled:opacity-50">Prev</button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 border rounded ${
            page === currentPage
              ? "bg-purple-600 text-white"
              : "hover:bg-purple-500 hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}
      <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage+1)}  className="px-3 py-1 border rounded hover:bg-purple-500 hover:text-white disabled:opacity-50">Next</button>
    </div>
  )
}

export default Pagination