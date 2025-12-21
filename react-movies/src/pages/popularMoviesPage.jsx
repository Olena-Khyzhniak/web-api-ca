import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import MovieListPageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getPopularMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylistIcon";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import RemoveFromFavoritesIcon from "../components/cardIcons/removeFromFavorites";
import { MoviesContext } from "../contexts/moviesContext";

const PopularMoviesPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["popular"],
    queryFn: getPopularMovies,
  });

  const { favorites } = useContext(MoviesContext);

  if (isLoading) return <Spinner />;
  if (isError) {
    console.error("Error fetching popular movies:", error.message);
    return <p>Error loading popular movies.</p>;
  }

  return (
    <MovieListPageTemplate
      title="Popular Movies"
      movies={data.results}
      action={(movie) => {
        const movieId = movie.id || movie.movieId;
        const isFavorite = favorites.some((f) => f.movieId === movieId);

        return (
          <>
            <AddToPlaylistIcon movie={movie} />
            {isFavorite ? (
              <RemoveFromFavoritesIcon movie={movie} />
            ) : (
              <AddToFavoritesIcon movie={movie} />
            )}
          </>
        );
      }}
    />
  );
};

export default PopularMoviesPage;
