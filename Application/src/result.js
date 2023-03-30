import React, { useState,useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Review from "./Review";
import TablePagination from '@mui/material/TablePagination';

export default function ResultComponent({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setPage(0);
  }, [data]);

  return (
    <div className="section2">
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 200 }} align="center">
                  Movie Name
                </TableCell>
                <TableCell sx={{ width: 200 }} align="center">
                  Genres
                </TableCell>
                <TableCell sx={{ width: 120 }} align="center">
                  Rating
                </TableCell>
                <TableCell sx={{ width: 200 }} align="center">
                  Production Company
                </TableCell>
                <TableCell sx={{ width: 100 }} align="center">
                  Release Date
                </TableCell>
                <TableCell align="center">Review</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {item.Movie_Name}
                  </TableCell>
                  <TableCell align="center">
                    {item.Genre_s_.map((genre) => {
                      return genre;
                    })}
                  </TableCell>
                  <TableCell align="center">
                    <span>tmdb: {item.tmdb_Rating}</span>
                    <br />
                    <span>user: {item.User_Rating}</span>
                  </TableCell>
                  <TableCell align="center">{item.Production_Company}</TableCell>
                  <TableCell align="center">
                    {new Date(item.Release_Date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left">
                    <Review text={item.Review_Content} maxLength={250} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
