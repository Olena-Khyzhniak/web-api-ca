import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";

const MovieList = ({ movies, action }) => {
  return movies.map((m) => (
    <Grid
      key={m.id || m.movieId || m._id}
      size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
      sx={{ padding: "20px" }}
    >
      <Movie
        key={m.id || m.movieId || m._id}
        movie={m}
        action={action}
      />
    </Grid>
  ));
};

export default MovieList;
