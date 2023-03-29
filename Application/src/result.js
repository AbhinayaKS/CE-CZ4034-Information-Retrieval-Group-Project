import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Review from './Review';

export default function ResultComponent({data}) {
  const [showMore, setShowMore] = useState(false);
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
        <div >
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Movie Name</TableCell>
              <TableCell>Genres</TableCell>
              <TableCell >Rating</TableCell>
              <TableCell>Production Company</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell sx={{width:500}}>Review</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {getPageData().map((item, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {item.Movie_Name}
                </TableCell>
                <TableCell align='left'>{item.Genre_s_.map((genre)=>{
                  return (genre)
                })}</TableCell>
                <TableCell align='left'><span>tmdb: {item.tmdb_Rating}</span><br/><span>user: {item.User_Rating}</span></TableCell>
                <TableCell align='left'>{item.Production_Company}</TableCell>
                <TableCell align='left'>{new Date(item.Release_Date).toLocaleDateString()}</TableCell>
                <TableCell align="left"><Review text={item.Review_Content} maxLength={50} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
          </TableContainer>
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
