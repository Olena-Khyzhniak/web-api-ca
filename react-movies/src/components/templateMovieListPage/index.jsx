import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortBy, setSortBy] = useState("rating");

  const genreId = Number(genreFilter);

 
  let displayedMovies = movies
    .filter((m) => {
      const title = m.title?.toLowerCase() || "";
      return title.includes(nameFilter.toLowerCase());
    })
    .filter((m) => {
      const genres = m.genre_ids || []; 
      return genreId > 0 ? genres.includes(genreId) : true;
    });

  
  displayedMovies.sort((a, b) => {
    const ratingA = a.vote_average || a.voteAverage || 0;
    const ratingB = b.vote_average || b.voteAverage || 0;

    const dateA = new Date(a.release_date || a.releaseDate || "1900-01-01");
    const dateB = new Date(b.release_date || b.releaseDate || "1900-01-01");

    if (sortBy === "rating") return ratingB - ratingA;
    if (sortBy === "date") return dateB - dateA;
    if (sortBy === "alphabetical") return a.title.localeCompare(b.title);

    return 0;
  });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "sort") setSortBy(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>

      <Grid container sx={{ flex: "1 1 500px" }}>
        
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            sortBy={sortBy}
          />
        </Grid>

       
        <MovieList action={action} movies={displayedMovies} />

      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
