import React, { useState, useEffect } from 'react';
import './App.css';
import Movie from "./components/Movie"

const FeaturedApi =  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getFeaturedApi()
  }, [])

  const getFeaturedApi = async () => {
    const movieResp = await fetch(FeaturedApi)
    const moviesJson = await movieResp.json()
    setMovies(moviesJson.results)
  }
  
  //

  const handleSubmit = (e) => {
    e.preventDefault()

       fetch(SEARCHAPI + searchTerm)
       .then((res) => res.json())
       .then((data) => {
         setMovies(data.results)
       })
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return(
    <>
      <header>
        <div className="title">
        <h1>Movie App</h1>
        </div>

        <div className="form">
        <form onSubmit={handleSubmit}>
        <input className="search"
         type="search"
          placeholder="...search"
          value={searchTerm}
          onChange={handleChange}
          />
        </form>
        </div>
       
      </header>
    <div className="movie-container">
      {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie}  />)}
    </div>
   </>
  )
}




export default App;
