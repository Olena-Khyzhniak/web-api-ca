import React from "react";
import MovieCard from "../movieCard/";
import Grid from "@mui/material/Grid";

const MovieList = ({ movies, action }) => {
  return movies.map((m) => {
    const movieId = m.id || m.movieId || m._id;

    return (
      <Grid
        key={movieId}
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2}
        sx={{ padding: "20px" }}
      >
        <MovieCard movie={m} action={action} />
      </Grid>
    );
  });
};

export default MovieList;
