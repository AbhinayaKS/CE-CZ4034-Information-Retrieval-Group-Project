import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Review from "./Review";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TablePagination from "@mui/material/TablePagination";

export default function ResultComponent({ data }) {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
    setPage(0);
  }, [data]);

  return (
    <div>
      {loading ? (
        <Skeleton style={{ height: "150px" }} count={3} />
      ) : (
        <div>
          <div>
            <div className="section2">
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
                      <TableCell sx={{ width: 50 }} align="center">
                        Sentiment
                      </TableCell>
                      <TableCell sx={{ width: 50 }} align="center">
                        Sarcasm
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, index) => (
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
                          <TableCell align="center">
                            {item.Production_Company}
                          </TableCell>
                          <TableCell align="center">
                            {new Date(item.Release_Date).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="left">
                            <Review
                              text={item.Review_Content}
                              maxLength={250}
                            />
                          </TableCell>
                          <TableCell align="center">{item.Sentiment}</TableCell>
                          <TableCell align="center">{item.Sarcasm}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div
            style={{ position: "fixed", left: "0", bottom: "0", width: "100%" }}
          >
            <TablePagination
              component="div"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
