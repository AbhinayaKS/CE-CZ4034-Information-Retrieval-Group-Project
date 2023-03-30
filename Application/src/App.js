import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./App.css";
import Button from "@mui/material/Button";
import ResultComponent from "./result";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function App() {
  const movies_url = `http://localhost:8983/solr/movie/select?indent=true&q.op=OR&q=*%3A*&rows=150&useParams=`;

  const genres_url =
    "http://localhost:8983/solr/movie/select?q=*:*&facet.field={!key=distinctGenre}distinctGenre&facet=on&rows=0&wt=json&json.facet={distinctGenre:{type:terms,field:distinctGenre,limit:10000,missing:false,sort:{index:asc},facet:{}}}";

  const prod_Company_url =
    'http://localhost:8983/solr/movie/select?q=*:*&json.facet={"distinct_Prd_Company":{"type":"terms","field":"distinct_Prd_Company","limit":-1,"mincount":5}}&rows=0';

  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState([]);
  const [filteredGenre, setFilteredGenre] = useState([]);
  const [prod_Company, setProd_Company] = useState([]);
  const [filteredCompany, setFilteredCompany] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  // State variable for filtered results
  const [filteredResults, setFilteredResults] = useState([]);

  const [condition, setCondition] = useState({
    genre: [],
    startDate: new Date(),
    endDate: new Date(),
    prod_Company: "",
  });
  const [dateCondition, setDateCondition] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  async function fetchMovies() {
    let response = await axios(movies_url);
    let data = await response.data.response.docs;
    setResults(data);
  }

  async function fetchGenre() {
    let response = await axios(genres_url);
    let data = await response.data.facets.distinctGenre.buckets;
    setGenre(data);
  }

  async function fetchProd_Company() {
    let response = await axios(prod_Company_url);
    let data = await response.data.facets.distinct_Prd_Company.buckets;
    setProd_Company(data);
  }

  useEffect(() => {
    fetchMovies();
    fetchGenre();
    fetchProd_Company();
  }, []);

  useEffect(() => {
    let filteredData = results;
    console.log(condition);
    if (condition.genre.length > 0) {
      filteredData = filteredData.filter((result) => {
        let genres = result.Genre_s_[0]?.split(",");
        genres = genres.map(function (a) {
          return a.trim().toLowerCase();
        });
        return condition.genre.every((g) =>
          genres.includes(String(g).toLowerCase())
        );
      });
    }

    if (condition.prod_Company !== "") {
      console.log("Doing company");
      filteredData = filteredData.filter(
        (results) =>
          String(results.Production_Company) === String(filteredCompany[0])
      );
    }

    setFilteredResults(filteredData);
  }, [condition, results]);

  useEffect(() => {
    if (query.length == 0) {
      fetchMovies();
    }
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleGenreConditionChange = (event) => {
    const {
      target: { value },
    } = event;
    const filteredSelection =
      typeof value === "string" ? value.split(",") : value;
    setFilteredGenre(filteredSelection);
    setCondition((prevState) => {
      return { ...prevState, genre: filteredSelection };
    });
  };

  const handleCompanyConditionChange = (event) => {
    const {
      target: { value },
    } = event;
    const filteredSelection = value;
    setFilteredCompany(filteredSelection);
    setCondition({ ...condition, prod_Company: filteredSelection });
  };

  // function to search movie by name
  const searchByName = async (q) => {
    const response = await axios.get(
      `http://localhost:8983/solr/movie/spell?q=Movie_Name:"${q}"&spellcheck=true&spellcheck.count=3&spellcheck.build=true&spellcheck.accuracy=0.6&spellcheck.onlyMorePopular=true&spellcheck.reload=true`
    );
    if (response.data.response.numFound > 0) {
      setResults(response.data.response.docs);
      setSuggestions([]);
    } else if (response.data.spellcheck.suggestions.length > 0) {
      setSuggestions(
        response.data.spellcheck.suggestions[1].suggestion.map((s) => s.word)
      );
      setResults([]);
    } else {
      setResults([]);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (event) => {
    setQuery(event);
    searchByName(event);
  };

  const submit = (e) => {
    e.preventDefault();
    try {
      searchByName(query);
    } catch (error) {
      console.log(query);
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>IMDB DATA</h1>
        <div className="d-flex">
          <div style={{ width: "40%" }}>
            {/* Search bar */}
            <form onSubmit={submit}>
              <TextField
                id="movie-search"
                label="Search movie"
                type="search"
                value={query}
                onChange={handleInputChange}
                style={{ width: "100%" }}
              />
            </form>
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div style={{ marginTop: "1rem" }}>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    listStyleType: "none",
                  }}
                >
                  <li style={{ color: "#FF5349", marginRight: "1rem" }}>
                    Search instead for:{" "}
                  </li>
                  {suggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <a
                        href="#"
                        onClick={() => handleSuggestionClick(suggestion)}
                        style={{ marginRight: "1rem" }}
                      >
                        {suggestion}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Genre filter */}
          <FormControl style={{ marginLeft: "1%", width: "20%" }}>
            <InputLabel id="movie-genre-label">Genre</InputLabel>
            <Select
              labelId="movie-genre-label"
              id="movie-genre"
              multiple
              value={filteredGenre}
              onChange={handleGenreConditionChange}
              input={<OutlinedInput label="Genre" />}
            >
              {genre.map((g) => (
                <MenuItem key={g.val} value={g.val}>
                  {g.val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Date */}
          <div style={{ marginLeft: "1%", width: "20%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={"Release Year"}
                views={["year"]}
                onChange={(item) => setDateCondition([item.selection])}
              />
            </LocalizationProvider>
          </div>
          {/* Company filter */}
          <FormControl style={{ marginLeft: "1%", width: "20%" }}>
            <InputLabel id="company-label">Company</InputLabel>
            <Select
              labelId="company-label"
              id="company"
              value={filteredCompany}
              onChange={handleCompanyConditionChange}
              input={<OutlinedInput label="Company" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {prod_Company.map((c) => (
                <MenuItem key={c.val} value={c.val}>
                  {c.val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <ResultComponent data={filteredResults} />
      </div>
    </div>
  );
}

export default App;
