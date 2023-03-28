import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './App.css';
import ResultComponent from './result';

function App() {

  const genres_url = 'http://localhost:8983/solr/movies/select?q=*:*&facet=true&facet.field=Genre_s_&facet.limit=-1&facet.mincount=1'

  const [query, setQuery] = useState('');
  const [condition, setCondition] = useState([]);
  const [results, setResults] = useState([]);
  const [dateCondition, setDateCondition] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  useEffect(() => {
    console.log("dateCondition", dateCondition);
  }, [dateCondition]);

  const movieGenres = [ "Action","Adventure","Animation","Comedy","Crime","Thriller","Fantasy","Science Fiction","Drama",
                        "Family","Mystery","Horror","Romance","History","War","Western"]

  const production_Company = ["A","B","C"]

  let dataResult = [{"Movie_Name":"Movie A","genres":"A,B,C,D,E"},
                      {"Movie_Name":"Movie A1","genres":"A,B,C,D,E"},
                      {"Movie_Name":"Movie A2","genres":"A,B,C,D,E"},
                      {"Movie_Name":"Movie A3","genres":"A,B,C,D,E"},
                      {"Movie_Name":"Movie A","genres":"A,B,C,D,E"},
                      {"Movie_Name":"Movie A","genres":"A,B,C,D,E"},
                      {"Movie_Name":"Movie A","genres":"A,B,C,D,E"},
                      {"Movie_Name":"Movie A4","genres":"A,B,C,D,E"},
                      {"Movie_Name":"Movie A","genres":"A,B,C,D,E"},
                      {"Movie_Name":"Movie A","genres":"A,B,C,D,E"},
                      {"Movie_Name":"Movie A","genres":"A,B,C,D,E"},
                      {"Movie_Name":"Movie A","genres":"A,B,C,D,E"}]
  movieGenres.sort((a, b) => a.localeCompare(b));

   // State variable for filtered results
   const [filteredResults, setFilteredResults] = useState(dataResult);

   // Filter results based on query state variable
   useEffect(() => {
     if (condition) {
      console.log(condition)
       const filteredData = dataResult.filter((item) => {
         return item.Movie_Name.toLowerCase().includes(condition);
       });
       setFilteredResults(filteredData);
     } else {
       setFilteredResults(dataResult);
     }
   }, [condition]);


  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleConditionChange = (e) => {
    const genre = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setCondition([...condition, genre]);
    } else {
      setCondition(condition.filter((g) => g !== genre));
    }
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8983/solr/movies/select?indent=true&q.op=OR&q=Movie_Name%3A${query}&useParams=`
      );
      setResults(response.data.response.docs);
      dataResult = response.data.response.docs
      console.log("dataResult",dataResult)
      console.log("result",results)
    } catch (error) {
      console.log(query);
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className='header'>
        <h1>IMDB DATA</h1>
      </div>
      <div className='section1'>
        <h2>IMDb Search</h2>
        <div>
          <form onSubmit={submit}>
            <div>
              <div className='search-bar'>
                <input type="text" name="search_text" id="search_text" className="form-control" placeholder="Enter your query..." value={query} onChange={handleInputChange}/>
              </div>
              <div>
              </div>
            </div>
          </form>
        </div>
        <div>
          <h4>Movie genres</h4>
          <div className='genres_container'>
            {movieGenres.map((genre) => {
            return (
              <div class="form-check" key={genre}>
              <input class="form-check-input" type="checkbox"  value={genre} id={genre} onChange={(e) => handleConditionChange(e)}/>
              <label class="form-check-label" htmlFor={genre}>
                {genre}
              </label>
            </div>
            )
            })}
          </div>
        </div>
        <div>
          <h4>Movie Date</h4>
          <div>
          <DateRange editableDateInputs={true} onChange={item => setDateCondition([item.selection])} moveRangeOnFirstSelection={false} ranges={dateCondition} />
          </div>
        </div>
        <div>
          <h4>Production Company</h4>
          {production_Company.map((element) => {
          return (
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
            <label class="form-check-label" for="flexCheckDefault">
              {element}
            </label>
          </div>
          )
          })}
        </div>
      </div>
      <ResultComponent data={filteredResults} />
    </div>
  );
}

export default App;
