import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylistIcon";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import RemoveFromFavoritesIcon from "../components/cardIcons/removeFromFavorites";
import { MoviesContext } from "../contexts/moviesContext";

const UpcomingMoviesPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
  });

  const { favorites } = useContext(MoviesContext);

  if (isLoading) return <Spinner />;
  if (isError) {
    console.error("Error fetching upcoming movies:", error.message);
    return <p>Error loading upcoming movies.</p>;
  }

  return (
    <PageTemplate
      title="Upcoming Movies"
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

export default UpcomingMoviesPage;
