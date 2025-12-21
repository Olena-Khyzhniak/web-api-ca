import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import RemoveFromFavoritesIcon from "../components/cardIcons/removeFromFavorites";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api/tmdb-api";
import { MoviesContext } from "../contexts/moviesContext";

const HomePage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["discover"],
    queryFn: getMovies,
  });

  const { favorites } = useContext(MoviesContext);

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading movies</h2>;

  return (
    <PageTemplate
      title="Best Movies For You"
      movies={data.results}
      action={(movie) => {
        const movieId = movie.id || movie.movieId;
        const isFavorite = favorites.some((f) => f.movieId === movieId);

        return isFavorite ? (
          <RemoveFromFavoritesIcon movie={movie} />
        ) : (
          <AddToFavoritesIcon movie={movie} />
        );
      }}
    />
  );
};

export default HomePage;
