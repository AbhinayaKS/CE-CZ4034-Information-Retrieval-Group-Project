import React, { useState, useEffect } from 'react';

export default function ResultComponent({data}) {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const dataResult = data

    const numberOfPages = Math.ceil(dataResult.length / itemsPerPage);
    const getPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return dataResult.slice(startIndex, endIndex);
    }

return(
    <div className='section2'>
        <div className="row">
          {getPageData().map((item, index) => (
            <div className="box" key={index}>
              <h1>{item.title}</h1>
              <h1>{item.genres}</h1>
            </div>
          ))}
        </div>
        <nav>
          <ul className="pagination">
            <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            </li>
            {Array(numberOfPages).fill().map((_, i) => (
              <li className={`page-item${i + 1 === currentPage ? ' active' : ''}`} key={i}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item${currentPage === numberOfPages ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
)
}
